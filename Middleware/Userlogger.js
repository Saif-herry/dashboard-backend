const Userlogger = (req, res, next) => {
  const { email, name, password } = req.body

  if (email && name && password) {
    next()
  } else {
    return res.status(400).send('All Fields are required!!!')
  }
}

module.exports = Userlogger
