const express = require('express')

const TopProductRouter = express.Router()

const Top_productModel = require('../Models/Top_products.model')

TopProductRouter.get('/', async (req, res) => {
  try {
    const top_product = await Top_productModel.find()
    res.status(200).send(top_product)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

TopProductRouter.post('/create', async (req, res) => {
  try {
    const top_product = await Top_productModel.create(req.body)
    top_product.save()
    res.status(200).send(top_product)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

TopProductRouter.delete('/delete/:id', async (req, res) => {
  try {
    const top_product = await Top_productModel.findByIdAndDelete(req.params.id)
    res.status(200).send(top_product)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

TopProductRouter.patch('/patch/:id', async (req, res) => {
  try {
    const top_product = await Top_productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ) //Return the updated document and run schema Validators
    if (!top_product) {
      return res.status(404).send({ message: 'Top Products are not found' })
    }

    res.status(200).send(top_product)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

module.exports = TopProductRouter
