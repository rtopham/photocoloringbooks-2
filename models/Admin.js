const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({

  adminUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]

})

module.exports = mongoose.model('Admin', AdminSchema)
