const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')
const authLogging = require('../../middleware/authLogging')
const AllTimeStat = require('../../models/All-Time-Stat')

//@route    GET api/all-time-stats
//@desc     Get All Time stats
//@access   Private--Admin Only

router.get('/', auth, authAdmin, async (req, res) => {
  try {
    const stats = await AllTimeStat.find()
    res.json(stats)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    PUT api/all-time-stats
//@desc     Create or Update All Time Stat
//@access   Private--logSecret required

router.put('/', authLogging, async (req, res) => {
  const { type, description } = req.body

  try {
    const stat = await AllTimeStat.findOneAndUpdate(
      { type: type },
      { $set: { description: description }, $inc: { amount: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )

    res.json(stat)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error.')
  }
})

module.exports = router
