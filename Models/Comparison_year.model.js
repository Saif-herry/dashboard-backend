const mongoose = require('mongoose')

const Comparison_yearSchema = new mongoose.Schema({
  month: { type: String, required: true },
  current_year: { type: String, required: true },
  previous_year: { type: String, required: true }
})

const Comparison_yearModel = mongoose.model('comparison', Comparison_yearSchema)

module.exports = Comparison_yearModel
