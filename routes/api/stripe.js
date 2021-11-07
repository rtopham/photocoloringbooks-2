const express = require('express')
const router = express.Router()
const config = require('config')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')
const { set } = require('mongoose')

const stripe = require('stripe')(config.get('stripeSecretKey'))

//@route    POST api/stripe
//@desc     Create Stripe Customer
//@access   Private

router.post(
  '/',
  [
    auth,
    [
      check('email', 'Please include a valid email').isEmail(),
      check('payment_method', 'Payment Method is Required').not().isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, payment_method } = req.body

    try {
      const customer = await stripe.customers.create({
        email: email,
        payment_method: payment_method,
        invoice_settings: {
          default_payment_method: payment_method
        }
      })
      res.json(customer)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

//@route    PUT api/stripe/update
//@desc     Update Stripe Customer
//@access   Private

router.put(
  '/',
  [
    auth,
    [
      check('id', 'Please include a valid id').not().isEmpty(),
      check('payment_method', 'Payment Method is Required').not().isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id, payment_method } = req.body

    try {
      //Attach payment method to customer
      //      await stripe.paymentMethods.attach(payment_method, { customer: id })

      const customer = await stripe.customers.update(id, {
        invoice_settings: {
          default_payment_method: payment_method
        }
      })
      res.json(customer)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

//@route    POST api/stripe/create-new-subscription
//@desc     Create Stripe Subscription
//@access   Private

router.post(
  '/create-new-subscription',
  [auth, [check('customerId', 'Customer Id is Required').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { customerId } = req.body

    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: config.get('stripeSubscriptionPricingId') }],
        cancel_at_period_end: true
      })
      res.json(subscription)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

//@route    POST api/stripe/create-payment-intent
//@desc     Create Stripe Payment Intent
//@access   Private

router.post(
  '/create-payment-intent',
  auth,

  async (req, res) => {
    //  const { amount } = req.body
    //  console.log(amount)

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: config.get('subscriptionPrice'),
        currency: 'usd'
      })
      res.send({ clientSecret: paymentIntent.client_secret })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

//@route    GET api/stripe/create-setup-intent
//@desc     Create Stripe Setup Intent
//@access   Private

router.get(
  '/create-setup-intent/:id',
  auth,

  async (req, res) => {
    try {
      const setupIntent = await stripe.setupIntents.create({
        customer: req.params.id
      })
      res.send({ CLIENT_SECRET: setupIntent.client_secret })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

//@route    GET api/stripe/customer
//@desc     Get Stripe Customer Data
//@access   Private

router.get(
  '/customer/:id',
  auth,

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const customer = await stripe.customers.retrieve(req.params.id)
      res.json(customer)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

//@route    GET api/stripe/subscription
//@desc     Get Stripe Subscription Data
//@access   Private

router.get(
  '/subscription/:id',
  auth,

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(req.params.id)
      res.json(subscription)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

//@route    GET api/stripe/card
//@desc     Get Stripe Card Data
//@access   Private

router.get(
  '/card/:id',
  auth,

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const card = await stripe.paymentMethods.retrieve(req.params.id)

      res.json(card)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

//@route  GET api/stripe/active-subscriptions
//@desc   Get number of active subscriptions
//@access Private--admin only

router.get(
  '/active-subscriptions',
  auth,
  authAdmin,

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const today = new Date()

    const firstDayOfTheMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )

    let firstDayOfLastMonth

    if (today.getMonth() === 0) {
      firstDayOfLastMonth = new Date(today.getFullYear() - 1, 11, 1)
    } else {
      firstDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      )
    }

    const firstDayOfThisYear = new Date(today.getFullYear(), 0, 1)
    const firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 1)

    const firstDayOfLastMonthTimeStamp = Math.floor(
      firstDayOfLastMonth / 1000
    ).toString()
    const firstDayOfTheMonthTimeStamp = Math.floor(
      firstDayOfTheMonth / 1000
    ).toString()
    const firstDayOfThisYearTimeStamp = Math.floor(
      firstDayOfThisYear / 1000
    ).toString()
    const firstDayOfLastYearTimeStamp = Math.floor(
      firstDayOfLastYear / 1000
    ).toString()

    try {
      const subscriptions = await stripe.subscriptions.list()

      const subscriptionsLastMonth = await stripe.subscriptions.list({
        current_period_start: {
          gte: firstDayOfLastMonthTimeStamp,
          lt: firstDayOfTheMonthTimeStamp
        }
      })
      const subscriptionsThisMonth = await stripe.subscriptions.list({
        current_period_start: { gte: firstDayOfTheMonthTimeStamp }
      })
      const subscriptionsThisYear = await stripe.subscriptions.list({
        current_period_start: { gte: firstDayOfThisYearTimeStamp }
      })
      const subscriptionsLastYear = await stripe.subscriptions.list({
        current_period_start: {
          gte: firstDayOfLastYearTimeStamp,
          lt: firstDayOfThisYearTimeStamp
        }
      })

      const subscriptionsCount = subscriptions.data.length
      const subscriptionsLastMonthCount = subscriptionsLastMonth.data.length
      const subscriptionsThisMonthCount = subscriptionsThisMonth.data.length
      const subscriptionsThisYearCount = subscriptionsThisYear.data.length
      const subscriptionsLastYearCount = subscriptionsLastYear.data.length

      res.json({
        subscriptionsCount,
        subscriptionsThisMonthCount,
        subscriptionsLastMonthCount,
        subscriptionsThisYearCount,
        subscriptionsLastYearCount
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

module.exports = router
