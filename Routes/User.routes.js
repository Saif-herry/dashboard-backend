const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userRouter = express.Router()
const UserModel = require('../Models/User.model')
const Userlogger = require('../Middleware/Userlogger')

// User Registration
userRouter.post('/register', Userlogger, async (req, res) => {
  try {
    const { email, name, password } = req.body

    // Hash the password
    const hash = await bcrypt.hash(password, 8)

    // Create a new user
    const user = new UserModel({
      email,
      name,
      password: hash
    })

    // Save the user to the database
    await user.save()

    return res.status(200).send({
      message: 'Registration Successful',
      user: user
    })
  } catch (error) {
    return res.status(500).send('Error in registration: ' + error.message)
  }
})

// User Login
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(401).send('Login Failed, User not Found!')
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).send('Invalid Credentials')
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET || 'defaultsecret', // Use env variable for JWT secret
      { expiresIn: '1h' } // Token expires in 1 hour
    )

    return res.status(200).send({
      message: 'Login Successful',
      token: token,
      user: user
    })
  } catch (error) {
    return res.status(500).send('Error in login: ' + error.message)
  }
})

module.exports = userRouter
