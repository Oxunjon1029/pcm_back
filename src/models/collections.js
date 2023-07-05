const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    uz: { type: String, required: true }
  },
  topic: {
    en: { type: String },
    uz: { type: String }
  },
  imageUrl: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollectionUsers'
  },
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

module.exports = mongoose.model('Collections', collectionSchema)