const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')
const authLogging = require('../../middleware/authLogging')
const Log = require('../../models/Log')

//@route    GET api/logs
//@desc     Get All logs
//@access   Private--Admin Only

router.get('/', auth, authAdmin, async (req, res) => {
  try {
    const logs = await Log.find()
    res.json(logs)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    POST api/logs
//@desc     Create New Log
//@access   Private--logSecret required

router.post('/', authLogging, async (req, res) => {
  const { action, description } = req.body
  let logData = { action, description }
  if (req.user) logData.user = req.user.id

  try {
    const newLog = new Log(logData)
    const log = await newLog.save()

    res.json(log)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error.')
  }
})

module.exports = router
