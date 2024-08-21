const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', true)

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Increase the timeout as needed
  connectTimeoutMS: 10000 // Increase the connection timeout as needed
}

mongoose
  .connect(process.env.MONGO_URL, options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err))

module.exports = mongoose.connection
