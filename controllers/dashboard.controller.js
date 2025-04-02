const userModel = require('../models/user.model')
const jobModel = require('../models/job.model')
const interviewModel = require('../models/interview.model')
const { err500, err404 } = require('../utils/error')
const layout = 'layout/index'

const dashboard = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)
    const jobs = await jobModel.getCountAll(isExpired=false)
    const interviews = await interviewModel.getCountAll(interviewStatus="scheduled")

    const context = {
      user, jobs, interviews
    }
  
    res.status(200).render('dashboard/index', { context, title: 'Dashboard Admin', layout})
    
  } catch (error) {
    console.error('Error in dashboard:', error)
    res.status(500).render('error/error', err500)
  }
}

module.exports = {
  dashboard
}