const express = require('express')
const loginController = require('../controllers/login.controller')

const loginRouter = express.Router()

loginRouter.get('/login', loginController.login)
loginRouter.post('/login', loginController.loginPost)
loginRouter.get('/logout', loginController.logoutPost)

module.exports = {
  loginRouter
}