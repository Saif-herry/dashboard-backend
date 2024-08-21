const mongoose = require('mongoose')

const Top_productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sold_amount: { type: Number, required: true },
  unit_price: { type: Number, required: true },
  revenue: { type: Number, required: true },
  rating: { type: Number, required: true }
})

const Top_productModel = mongoose.model('top_product', Top_productSchema)

module.exports = Top_productModel
