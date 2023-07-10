const mongoose = require('mongoose');

const collectionUsers = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  hash_password: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  googleId: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('CollectionUsers', collectionUsers)