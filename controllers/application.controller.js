const userModel = require('../models/user.model')
const applicationModel = require('../models/application.model')
const interviewModel = require('../models/interview.model')
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

module.exports = {
  getAllApplications
}