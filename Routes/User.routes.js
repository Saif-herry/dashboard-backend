const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userRouter = express.Router()
const UserModel = require('../Models/User.model')
const Userlogger = require('../Middleware/Userlogger')

userRouter.post('/register', Userlogger, async (req, res) => {
  const { email, name, password } = req.body
  await bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      return res.status(500).send('Error in password hash')
    }
    const user = new UserModel({
      email,
      name,
      password: hash
    })
    await user.save()
    return res
      .status(200)
      .send({ message: 'Registration SuccessFull', user: user })
  })
})

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })
  console.log('user', user)
  if (!user) {
    return res.status(501).send('Login Failed, User not Found!!')
  }

  const hashed_password = user.password
  await bcrypt.compare(password, hashed_password, function (err, result) {
    if (err) {
      return res.status(500).send('Error in Password hash')
    }
    if (result) {
      const token = jwt.sign({ email: user.email, userId: user._id }, 'secret')
      return res
        .status(200)
        .send({ message: 'Login SuccessFull', token: token, user: user })
    } else {
      res.status(401).send({ message: 'Invalid Credential' })
    }
  })
})

module.exports = userRouter
