const express = require('express')

const ComparisonYearRouter = express.Router()

const ComparisonYearModel = require('../Models/Comparison_year.model')

ComparisonYearRouter.get('/', async (req, res) => {
  try {
    const comparison_year = await ComparisonYearModel.find()
    // res.json({ comparison_year })
    res.status(200).send(comparison_year)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

ComparisonYearRouter.post('/create', async (req, res) => {
  try {
    const comparison_year = await ComparisonYearModel.create(req.body)
    comparison_year.save()
    res.status(200).send(comparison_year)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

ComparisonYearRouter.delete('/delete/:id', async (req, res) => {
  try {
    const comparison_year = await ComparisonYearModel.findByIdAndDelete(
      req.params.id
    )
    res.status(200).send(comparison_year)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

ComparisonYearRouter.patch('/patch/:id', async (req, res) => {
  try {
    const comparison_year = await ComparisonYearModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and run schema validators
    )

    if (!comparison_year) {
      return res.status(404).send({ message: 'Comparison year not found' })
    }

    res.status(200).send(comparison_year)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

module.exports = ComparisonYearRouter
