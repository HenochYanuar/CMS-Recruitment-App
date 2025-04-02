const express = require('express')
const authenticateJWT = require('../middleware/authMiddleware')
const userController = require('../controllers/user.controller')

const userRouter = express.Router()

userRouter.use(authenticateJWT)

userRouter.get('/users-list', userController.getAllUsers)

module.exports = {
  userRouter
}