const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')
const authLogging = require('../../middleware/authLogging')
const Stat = require('../../models/Stat')

//@route    GET api/stats
//@desc     Get All stats
//@access   Private--Admin Only

router.get('/', auth, authAdmin, async (req, res) => {
  try {
    const stats = await Stat.find()
    res.json(stats)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route    PUT api/stats
//@desc     Create or Update Stat
//@access   Private--logSecret required

router.put('/', authLogging, async (req, res) => {
  const { type, description } = req.body

  try {
    const stat = await Stat.findOneAndUpdate(
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
