const mongoose = require('mongoose')

const Summary_statisticsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true }
})

const Summary_statisticsModel = mongoose.model(
  'summary',
  Summary_statisticsSchema
)

module.exports = Summary_statisticsModel
