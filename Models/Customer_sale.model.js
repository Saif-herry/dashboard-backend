const mongoose = require('mongoose')

const Customer_saleSchema = new mongoose.Schema({
  date: { type: String, required: true },
  web_sale: { type: Number, required: true },
  offline_sale: { type: Number, required: true }
})

const Customer_saleModel = mongoose.model('customer_sale', Customer_saleSchema)

module.exports = Customer_saleModel
