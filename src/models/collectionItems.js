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
    strings: [{
      value: { type: String, required: true },
    }],
    dates: [{
      value: { type: String, required: true },
    }]
  }
}, { timestamps: true })
module.exports = mongoose.model('CollectionItems', collectionItemsSchema)