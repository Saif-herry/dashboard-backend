const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
  positive: { type: Number, required: true },
  negative: { type: Number, required: true },
  neutral: { type: Number, required: true }
})

const FeedbackModel = mongoose.model('feedback', FeedbackSchema)

module.exports = FeedbackModel
