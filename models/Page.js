const mongoose = require('mongoose')

const PageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: 'Filename is required'
  },
  caption: {
    type: String,
    default: ''
  },
  tags: {
    type: String,
    default: ''
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Page', PageSchema)
