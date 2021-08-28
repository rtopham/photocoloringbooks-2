const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const path = require('path')
const fs = require('fs')

const User = require('../../models/User')
const Page = require('../../models/Page')

//@route    POST api/pages
//@desc     Create Page
//@access   Private

router.post('/', auth, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  const pageFile = req.files.page

  let imgUrl = ''
  const savePage = async () => {
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 6; i += 1) {
      imgUrl += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    // Check to See if filename exists
    const existingPages = await Page.find({
      filename: { $regex: imgUrl }
    })
    if (existingPages.length > 0) savePage()
    else {
      // Upload and save file to file system.
      const ext = '.png'
      const targetPath = path.resolve(`uploads/pages/${imgUrl}${ext}`)
      const { caption, tags } = req.body

      pageFile.mv(targetPath, async (error) => {
        if (error) {
          console.error(error)
          res.writeHead(500, {
            'Content-Type': 'application/json'
          })
          res.end(JSON.stringify({ status: 'error', message: error }))
          return
        }
        try {
          const newPage = new Page({
            filename: imgUrl + ext,
            caption,
            tags: JSON.parse(tags),
            postedBy: req.user.id
          })
          const page = await newPage.save()

          res.json(page)
        } catch (err) {
          console.error(err.message)
          res.status(500).send('Server Error.')
        }
      })
    }
  }

  savePage()
})

//@route    PUT api/pages
//@desc     Update Page Caption and Tags
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
      let page = await Page.findById(req.params.id)
      if (!page) return res.status(404).json({ msg: 'Page not found' })

      //Make sure user owns page
      if (page.postedBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized' })
      }

      page = await Page.findByIdAndUpdate(
        req.params.id,
        { $set: pageFields },
        { new: true }
      )
      res.json(page)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error.')
    }
  }
)

// @route   DELETE api/pages/:id
// @desc    Delete page
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const page = await Page.findById(req.params.id)
    if (!page) return res.status(404).json({ msg: 'Page not found' })

    //   Make sure user owns page
    if (page.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' })
    }
    await Page.findByIdAndRemove(req.params.id)
    fs.unlink(path.resolve(`uploads/pages/${page.filename}`), (err) => {
      if (err) throw err
    })
    res.json(page)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    GET api/pages
//@desc     Load Gallery
//@access   Private

router.get('/', auth, async (req, res) => {
  try {
    const pages = await Page.find({ postedBy: req.user.id })
    res.json(pages)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
