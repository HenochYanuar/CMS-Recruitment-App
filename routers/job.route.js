const express = require('express')
const authenticateJWT = require('../middleware/authMiddleware')
const jobController = require('../controllers/jobs.controller')

const jobRouter = express.Router()

jobRouter.use(authenticateJWT)

jobRouter.get('/jobs', jobController.getAllJobs)
jobRouter.get('/jobs/add', jobController.formAddJob)
jobRouter.post('/jobs', jobController.postAddJob)
jobRouter.get('/jobs/:id', jobController.getDetailJob)
// jobRouter.delete('/articles/:id', articleController.deleteArticle)


module.exports = {
  jobRouter
}