const express = require('express')
const authenticateJWT = require('../middleware/authMiddleware')
const interviewController = require('../controllers/interview.controller')

const interviewRouter = express.Router()

interviewRouter.use(authenticateJWT)

interviewRouter.get('/interviews', interviewController.getJobInterview)
interviewRouter.get('/interviews/:id', interviewController.getDetailJobInterview)
interviewRouter.get('/interviews/:jobId/:id', interviewController.getDetailInterview)
interviewRouter.patch('/interviews/:jobId/:id', interviewController.postDetailInterview)

module.exports = {
  interviewRouter
}