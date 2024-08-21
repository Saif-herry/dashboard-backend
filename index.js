const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const connection = require('./config')
const userRouter = require('./Routes/User.routes')
const ComparisonYearRouter = require('./Routes/Comparison_year.routes')
const CustomerSaleRouter = require('./Routes/Customer_sale.routes')
const TopProductRouter = require('./Routes/Top_product.routes')
const FeedbackRouter = require('./Routes/Feedback.routes')
const SummaryStatisticsRouter = require('./Routes/Summary_statistics.routes')

app.get('/', (req, res) => {
  res.send('Welcome in Backend of dashboard!!!')
})

app.use('/user', userRouter)
app.use('/compare', ComparisonYearRouter)
app.use('/sale', CustomerSaleRouter)
app.use('/top_product', TopProductRouter)
app.use('/feedback', FeedbackRouter)
app.use('/summary', SummaryStatisticsRouter)

const PORT = process.env.PORT || 8000

app.listen(PORT, async () => {
  try {
    await connection
    console.log('db connected')
  } catch (err) {
    console.log('check config', err)
  }
  console.log(`listening on port ${PORT}`)
})
