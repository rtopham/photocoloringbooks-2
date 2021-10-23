const express = require('express')
const router = express.Router()

const auth = require('../../middleware/auth')
const path = require('path')
const fs = require('fs')

const User = require('../../models/User')
const Page = require('../../models/Page')

const config = require('config')

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand
} = require('@aws-sdk/client-s3')

const bucketName = config.get('AWS_BUCKET_NAME')
const region = config.get('AWS_BUCKET_REGION')
const folder = config.get('AWS_FOLDER_NAME')

const s3 = new S3Client({
  region: 'us-west-2'
})

//@route    POST api/pages
//@desc     Create Page
//@access   Private

router.post('/', auth, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  const pageFile = req.files.page
  //console.log(pageFile)
  const fileContent = pageFile.data

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
      const ext = '.png'
      const { caption, tags } = req.body

      // Save page to file system

      //      const targetPath = path.resolve(`uploads/pages/${imgUrl}${ext}`)

      /*       pageFile.mv(targetPath, async (error) => {
        if (error) {
          console.error(error)
          res.writeHead(500, {
            'Content-Type': 'application/json'
          })
          res.end(JSON.stringify({ status: 'error', message: error }))
          return
        }

        
      }) */

      //Save page info to database

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

      //Upload to AWS S3
      const uploadParams = {
        Bucket: bucketName,
        Key: 'pages/' + imgUrl + ext,
        Body: fileContent
      }

      const run = async () => {
        try {
          const data = await s3.send(new PutObjectCommand(uploadParams))
        } catch (err) {
          console.log('Error', err)
        }
      }
      run()
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

// @route   DELETE api/pages/by-user
// @desc    Delete all of User's pages
// @access  Private

router.delete('/by-user', auth, async (req, res) => {
  try {
    const pages = await Page.find({ postedBy: req.user.id })
    if (pages.length === 0)
      return res.status(404).json({ msg: 'No Pages found' })

    const objects = pages.map((object) => {
      return { Key: 'pages/' + object.filename }
    })

    //Delete from Database

    await Page.deleteMany({ postedBy: req.user.id })

    //Delete from S3

    const deleteParams = {
      Bucket: bucketName,
      Delete: { Objects: objects },
      Quiet: true
    }

    const response = await s3.send(new DeleteObjectsCommand(deleteParams))

    res.json(response)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

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

    //Delete from server file system

    /*     fs.unlink(path.resolve(`uploads/pages/${page.filename}`), (err) => {
      if (err) throw err
    }) */

    //Delete from S3

    const deleteParams = {
      Bucket: bucketName,
      Key: 'pages/' + page.filename
    }

    const response = await s3.send(new DeleteObjectCommand(deleteParams))

    res.json(response)
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

//@route GET api/pages/:key
//@desc   Get page image from S3
//@access Private

router.get('/url/:key', async (req, res) => {
  try {
    const downloadParams = {
      Bucket: bucketName,
      Key: folder + req.params.key
    }

    const s3Object = await s3.send(new GetObjectCommand(downloadParams))

    s3Object.Body.pipe(res)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
