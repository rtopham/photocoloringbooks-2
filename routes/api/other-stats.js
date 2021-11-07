const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')
const Page = require('../../models/Page')
const Book = require('../../models/Book')
const User = require('../../models/User')

//@route    GET api/other-stats
//@desc     Get Other stats
//@access   Private--Admin Only

router.get('/', auth, authAdmin, async (req, res) => {
  try {
    const pageCount = await Page.count()
    const bookCount = await Book.count()
    const userCount = await User.count()
    const freeUserCount = await User.count({
      stripeSubscriptionId: { $eq: null }
    })
    const paidUserCount = await User.count({
      stripeSubscriptionId: { $ne: null }
    })

    const stats = {
      bookCount,
      pageCount,
      userCount,
      freeUserCount,
      paidUserCount
    }
    res.json(stats)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
