const mongoose = require('mongoose');

const collectionItemsSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  uztags: [
    { title: String }
  ],
  entags: [{ title: String }],
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collections'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollectionUsers'
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollectionUsers'
  }],
  comments: [
    {
      content: { type: String, required: true },
      userName: {
        type: String,
        required: true
      }
    }
  ],
  customFields: {
    integers: [{
      name: { type: String, required: true },
      value: Number
    }],
    strings: [{
      name: { type: String, required: true },
      value: String
    }],
    multilineTexts: [{
      name: { type: String, required: true },
      value: String
    }],
    booleans: [{
      name: { type: String, required: true },
      value: Boolean
    }],
    dates: [{
      name: { type: String, required: true },
      value: Date
    }]
  }
}, { timestamps: true })
module.exports = mongoose.model('CollectionItems', collectionItemsSchema)