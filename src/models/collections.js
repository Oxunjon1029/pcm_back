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
    }],
    strings: [{
      name: { type: String, required: true },
    }],
    multilineTexts: [{
      name: { type: String, required: true },
    }],
    booleans: [{
      name: { type: String, required: true },
    }],
    dates: [{
      name: { type: String, required: true },
    }]
  }
}, { timestamps: true })

module.exports = mongoose.model('Collections', collectionSchema)