const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    uz: { type: String },
    en: { type: String }
  }
}, { timestamps: true })

module.exports = mongoose.model('Topics', topicSchema)