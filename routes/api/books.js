const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const path = require('path')
const fs = require('fs')

const Page = require('../../models/Page')
const Book = require('../../models/Book')

//@route    POST api/books
//@desc     Create Book
//@access   Private

router.post('/', auth, async (req, res) => {
  //  console.log('Here we Save in the Databaise')
  //console.log(req.body)
  try {
    const newBook = new Book({
      ...req.body,
      postedBy: req.user.id
    })
    const book = await newBook.save()

    res.json(book)
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
