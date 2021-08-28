const express = require('express')
const router = express.Router()
const config = require('config')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
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

module.exports = router
