const mongoose = require('mongoose')

const StatSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String
  },
  description: {
    type: String
  },
  amount: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Stat', StatSchema)
