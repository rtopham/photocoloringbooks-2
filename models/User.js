const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  bookLimit: {
    type: Number,
    default: 1
  },
  galleryLimit: {
    type: Number,
    default: 3
  },
  stripeCustomerId: { type: String, default: null },
  stripeSubscriptionId: { type: String, default: null },
  role: {
    type: String,
    default: 'user'
  }
})

module.exports = User = mongoose.model('user', UserSchema)
