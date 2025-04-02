const express = require('express')
const authenticateJWT = require('../middleware/authMiddleware')
const dashboardController = require('../controllers/dashboard.controller')

const dashboardRouter = express.Router()

dashboardRouter.use(authenticateJWT)

dashboardRouter.get('/dashboard', dashboardController.dashboard)

module.exports = {
  dashboardRouter
}