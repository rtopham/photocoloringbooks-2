const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({

  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  action: {
    type: String
  },
  description: {
    type: String
  },

})

module.exports = mongoose.model('Log', LogSchema)
