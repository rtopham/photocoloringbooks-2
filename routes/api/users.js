const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../../middleware/auth')
const {
  getAccountAccessAttemptedMessage,
  getPasswordResetMessage,
  getResetToken,
  sendMessage
} = require('../../lib/nodemailerMessageHandler')

const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

//@route    POST api/users
//@desc     Register user
//@access   Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 })
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })
      //See if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
      }
      //Get users gravatar

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        password
      })

      //Encrypt password

      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      //Return jsonwebtoken

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (error) {
      console.error(err.message)
      res.status(500).send('Server error.')
    }
  }
)

//@route    PUT api/users
//@desc     Update user profile
//@access   Private

router.put(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body

    const userFields = {}
    if (name) userFields.name = name
    if (email) userFields.email = email
    if (password) {
      const salt = await bcrypt.genSalt(10)
      userFields.password = await bcrypt.hash(password, salt)
    }

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: userFields },
        { new: true }
      )
      res.json(user)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error.')
    }
  }
)

//@route    PUT api/users/password-reset-request
//@desc     Handle request for password reset
//@access   Public

router.put(
  '/password-reset-request',
  [[check('email', 'Please include a valid email').isEmail()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email } = req.body
    let message = ''

    try {
      let user = await User.findOne({ email })
      //See if user exists
      if (!user) {
        message = getAccountAccessAttemptedMessage(email)
      } else {
        resetToken = getResetToken(user._id)
        message = getPasswordResetMessage(email, resetToken)
      }
      sendMessage(message)
      return res.status(200).send('Email Sent.')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error.')
    }
  }
)

//@route    POST api/users/validate-reset-token
//@desc     Validate Reset Token
//@access   Public

router.post(
  '/validate-reset-token',
  [[check('token', 'A token is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { token } = req.body

    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'))
      const user = decoded.user
      console.log(decoded)
      return res.status(200).json(decoded)
    } catch (err) {
      res.status(500).send('Server Error.')
    }
  }
)

//@route    PUT api/users/reset-password
//@desc     Reset User Password
//@access   Public but requires valid token

router.put(
  '/reset-password',
  [
    [
      check('token', 'A token is required').not().isEmpty(),
      check(
        'password',
        'Please enter a password with 8 or more characters'
      ).isLength({ min: 8 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { token, password } = req.body

    const userFields = {}
    if (password) {
      const salt = await bcrypt.genSalt(10)
      userFields.password = await bcrypt.hash(password, salt)
    }

    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'))

      const user = await User.findOneAndUpdate(
        { _id: decoded.user.id },
        { $set: userFields },
        { new: true }
      )

      res.status(200).send('Password reset.')
    } catch (err) {
      res.status(500).send('Server Error.')
    }
  }
)

module.exports = router
