const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const path = require('path')
const fs = require('fs')

const Page = require('../../models/Page')
const Book = require('../../models/Book')
const mongoose = require('mongoose')

//@route    POST api/books
//@desc     Create Book
//@access   Private

router.post('/', auth, async (req, res) => {
  try {
    let newBook = {
      ...req.body,
      postedBy: req.user.id
    }

    if (!newBook._id) newBook._id = new mongoose.mongo.ObjectId()

    const book = await Book.findOneAndUpdate(
      { _id: newBook._id },
      { $set: newBook },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )

    res.json(newBook)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error.')
  }
})

//@route    PUT api/books
//@desc     Update Book Caption and Tags
//@access   Private

router.put(
  '/:id',

  auth,

  async (req, res) => {
    const { caption, tags } = req.body

    const pageFields = {}
    if (caption) pageFields.caption = caption
    if (tags) pageFields.tags = tags

    try {
      let book = await Book.findById(req.params.id)
      if (!book) return res.status(404).json({ msg: 'Book not found' })

      //Make sure user owns book
      if (book.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized' })
      }

      book = await Book.findByIdAndUpdate(
        req.params.id,
        { $set: pageFields },
        { new: true }
      )
      res.json(book)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error.')
    }
  }
)

// @route   DELETE api/books/by-user
// @desc    Delete all books of user
// @access  Private

router.delete('/by-user', auth, async (req, res) => {
  try {
    const books = await Book.find({ postedBy: req.user.id })
    if (books.length === 0)
      return res.status(404).json({ msg: 'No Books found' })

    await Book.deleteMany({ postedBy: req.user.id })

    res.json(books)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   DELETE api/books/:id
// @desc    Delete book
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ msg: 'Book not found' })

    //   Make sure user owns book
    if (book.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' })
    }
    await Book.findByIdAndRemove(req.params.id)
    res.json(book)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    GET api/books
//@desc     Load Books
//@access   Private

router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find({ postedBy: req.user.id })
    res.json(books)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
