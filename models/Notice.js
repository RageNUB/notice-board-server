// models/Notice.js
const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {type: String, require: true},
  description: {type: String, require: true},
  createdAt: { type: Date, default: Date.now },
  createdBy: {type: String, require: true},//{type: Schema.Types.ObjectId, ref: 'User'}, // optional: save email or name
});

module.exports = mongoose.model('Notice', noticeSchema);