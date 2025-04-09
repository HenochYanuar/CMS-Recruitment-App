const express = require('express')
const authenticateJWT = require('../middleware/authMiddleware')
const applicationController = require('../controllers/application.controller')

const applicationRouter = express.Router()

applicationRouter.use(authenticateJWT)

applicationRouter.get('/applications/:id', applicationController.getAllApplications)
applicationRouter.get('/applications/:id/:user_id', applicationController.getDetailUser)
applicationRouter.patch('/applications/:id', applicationController.updateStatusApplication)

module.exports = {
  applicationRouter
}