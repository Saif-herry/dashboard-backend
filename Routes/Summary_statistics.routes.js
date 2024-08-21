const express = require('express')

const SummaryStatisticsRouter = express.Router()

const SummaryStatisticsModel = require('../Models/Summary_statistics.model')

SummaryStatisticsRouter.get('/', async (req, res) => {
  try {
    const summary = await SummaryStatisticsModel.find()
    res.status(200).send(summary)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

SummaryStatisticsRouter.post('/create', async (req, res) => {
  try {
    const summary = await SummaryStatisticsModel.create(req.body)
    summary.save()
    res.status(200).send(summary)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

SummaryStatisticsRouter.delete('/delete/:id', async (req, res) => {
  try {
    const summary = await SummaryStatisticsModel.findOneAndDelete(
      req.params.id,
      req.body
    )
    res.status(200).send(summary)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

SummaryStatisticsRouter.patch('/patch/:id', async (req, res) => {
  try {
    const summary = await SummaryStatisticsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!summary) {
      return res.status(404).send({ message: 'Summary not found' })
    }
    res.status(200).send(summary)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

module.exports = SummaryStatisticsRouter
