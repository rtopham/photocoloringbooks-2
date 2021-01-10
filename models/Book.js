const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ''
  },
  pages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Page'
    }
  ],
  coverPage: {
    title: {
      type: String
    },
    textLine1: {
      type: String
    },
    textLine2: {
      type: String
    },
    textLine3: {
      type: String
    },
    coverPage: {
      type: String
    },
    coverPageType: {
      type: String
    },
    footer: {
      type: String
    }
  },
  tags: [
    {
      type: String
    }
  ],
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
        type: String
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

module.exports = mongoose.model('Book', BookSchema)
