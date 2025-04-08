const express = require('express')
const authenticateJWT = require('../middleware/authMiddleware')
const jobController = require('../controllers/jobs.controller')

const jobRouter = express.Router()

jobRouter.use(authenticateJWT)

jobRouter.get('/jobs', jobController.getAllJobs)
jobRouter.get('/jobs/add', jobController.formAddJob)
jobRouter.post('/jobs', jobController.postAddJob)
jobRouter.get('/jobs/:id', jobController.getDetailJob)
jobRouter.get('/jobs/edit/:id', jobController.formEditJob)
jobRouter.patch('/jobs', jobController.postEditJob)
jobRouter.get('/jobs/expired/:id', jobController.postExpiredJob)

jobRouter.get('/jobsExpired', jobController.getExpiredJobs)
jobRouter.get('/jobsExpired/:id', jobController.getDetailExpiredJob)
jobRouter.get('/jobsExpired/unexpired/:id', jobController.postUnexpiredJob)
jobRouter.delete('/jobsExpired/:id', jobController.deleteJob)


module.exports = {
  jobRouter
}