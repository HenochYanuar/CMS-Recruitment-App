const userModel = require('../models/user.model')
const applicationModel = require('../models/application.model')
const interviewModel = require('../models/interview.model')
const userDetailModel = require('../models/userDetail.model')
const jobModel = require('../models/job.model')
const idCreator = require('../utils/idCreator')
const { err500, err404 } = require('../utils/error')
const layout = 'layout/index'

const getAllApplications = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)

    if (!user) {
      return res.status(404).render('error/error', err404)
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const jobId = req.params.id

    const { applications, totalItems } = await applicationModel.findByJobId(jobId, page, limit, search)

    const totalPages = Math.ceil(totalItems / limit)

    const context = {
      user,
      applications,
      currentPage: page,
      totalPages,
      totalItems,
      limit,
      search,
      jobId
    }

    res.render('application/index', {
      context,
      title: 'Applications List',
      layout
    })

  } catch (error) {
    console.error('Error in getApplications:', error)
    res.status(500).render('error/error', err500)
  }
}

const getDetailUser = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)
    const application = await applicationModel.getDetailUser(req.params.id, req.params.user_id)
    
    if (!user && !application) {
      return res.status(404).render('error/error', err404)
    }
  
    const context = {
      user,
      application
    }
    
    const title = 'Applicant Details'

    res.status(200).render('application/detail', {
      context,
      title,
      layout
    })

  } catch (error) {
    console.error('Error in getDetailUser:', error)
    res.status(500).render('error/error', err500)
  }
}

const updateStatusApplication = async (req, res) => {
  try {
    const { status } = req.body

    const application = await applicationModel.updateStatusApplication(req.params.id, status)

    if (!application) {
      return res.status(404).render('error/error', err404)
    }

    if (status === 'interview') {
      const application_id = application[0]['id']

      const id = idCreator.createID()

      const user = await userModel.findByEmail(req.user.email)
      const job = await jobModel.getOne(application[0]['job_id'])
      const userDetail = await userDetailModel.getDetailUser(application[0]['user_id'])
      let interview = await interviewModel.createInterview({id, application_id})
      
      interview = await interviewModel.getOne(id)

      if (!user && !interview) {
        return res.status(404).render('error/error', err404)
      }

      const status = ['scheduled', 'completed', 'canceled']

      const context = {
        user, interview, job, userDetail, status
      }
      
      const title = 'Form Interview Schedule'  
  
      res.status(200).render('interview/formEdit', {
        context,
        title,
        layout
      })
      
      return
    }

    res.status(200).redirect(`/admin/applications/${application[0]['job_id']}/${application[0]['user_id']}`)

  } catch (error) {
    console.error('Error in updateStatusApplication:', error)
    res.status(500).render('error/error', err500)
  }
}

module.exports = {
  getAllApplications, getDetailUser, updateStatusApplication
}