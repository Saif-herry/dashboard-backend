const express = require('express')

const CustomerSaleRouter = express.Router()

const CustomerSaleModel = require('../Models/Customer_sale.model')

CustomerSaleRouter.get('/', async (req, res) => {
  try {
    const Customer_sale = await CustomerSaleModel.find()
    res.status(200).send(Customer_sale)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

CustomerSaleRouter.post('/create', async (req, res) => {
  try {
    const Customer_sale = await CustomerSaleModel.create(req.body)
    Customer_sale.save()
    res.status(200).send(Customer_sale)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

CustomerSaleRouter.delete('/delete/:id', async (req, res) => {
  try {
    const Customer_sale = await CustomerSaleModel.findByIdAndDelete(
      req.params.id
    )
    res.status(200).send(Customer_sale)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

CustomerSaleRouter.patch('/patch/:id', async (req, res) => {
  try {
    const Customer_sale = await CustomerSaleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!Customer_sale) {
      return res.status(404).send({ message: 'Comparison year not found' })
    }
    res.status(200).send(Customer_sale)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

module.exports = CustomerSaleRouter
