const express = require('express')
const authenticateJWT = require('../middleware/authMiddleware')
const interviewController = require('../controllers/interview.controller')

const interviewRouter = express.Router()

interviewRouter.use(authenticateJWT)

interviewRouter.get('/interviews', interviewController.getJobInterview)
interviewRouter.get('/interviews/:id', interviewController.getDetailJobInterview)

module.exports = {
  interviewRouter
}