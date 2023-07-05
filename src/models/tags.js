const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
  title: {
    uz: { type: String },
    en: { type: String }
  }
}, { timestamps: true })

module.exports = mongoose.model('Tags', tagsSchema)