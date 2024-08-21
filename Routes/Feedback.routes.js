const express = require('express')

const FeedbackRouter = express.Router()

const FeedbackModel = require('../Models/Feedback.model')

FeedbackRouter.get('/', async (req, res) => {
  try {
    const feedback = await FeedbackModel.find()
    res.status(200).send(feedback)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

FeedbackRouter.post('/create', async (req, res) => {
  try {
    const feedback = await FeedbackModel.create(req.body)
    feedback.save()
    res.status(200).send(feedback)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

FeedbackRouter.delete('/delete/:id', async (req, res) => {
  try {
    const feedback = await FeedbackModel.findByIdAndDelete(req.params.id)
    res.status(200).send(feedback)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

FeedbackRouter.patch('/patch/:id', async (req, res) => {
  try {
    const feedback = await FeedbackModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    if (!feedback) {
      return res.status(404).send({ message: 'Feedback not found' })
    }
    res.status(200).send(feedback)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

module.exports = FeedbackRouter
