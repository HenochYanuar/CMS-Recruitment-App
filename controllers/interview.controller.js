const moment = require('moment')
const { decode } = require('html-entities')
const userModel = require('../models/user.model')
const interviewModel = require('../models/interview.model')
const jobModel = require('../models/job.model')
const tagsModel = require('../models/tags.model')
const saveImgMiddleware = require('../middleware/saveImgMiddleware')
const idCreator = require('../utils/idCreator')
const formatCurrency = require('../utils/formatCurrency')
const { err500, err404 } = require('../utils/error')

const layout = 'layout/index'

const getJobInterview = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)

    if (!user) {
      return res.status(404).render('error/error', err404)
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 9
    const search = req.query.search || ''

    const { jobs, totalItems } = await interviewModel.getAllJobsInterview(page, limit, search)

    const totalPages = Math.ceil(totalItems / limit)

    const jobsMap = jobs.map(job => {

      const updatedAt = moment(job.updated_at)
      const now = moment()

      let timeText = ''
      const diffInYears = now.diff(updatedAt, 'years')
      const diffInMonths = now.diff(updatedAt, 'months')
      const diffInWeeks = now.diff(updatedAt, 'weeks')
      const diffInDays = now.diff(updatedAt, 'days')
      const diffInHours = now.diff(updatedAt, 'hours')
      const diffInMinutes = now.diff(updatedAt, 'minutes')

      if (diffInYears >= 1) timeText = `${diffInYears} tahun yang lalu`
      else if (diffInMonths >= 1) timeText = `${diffInMonths} bulan yang lalu`
      else if (diffInWeeks >= 1) timeText = `${diffInWeeks} minggu yang lalu`
      else if (diffInDays >= 1) timeText = `${diffInDays} hari yang lalu`
      else if (diffInHours >= 1) timeText = `${diffInHours} jam yang lalu`
      else if (diffInMinutes >= 1) timeText = `${diffInMinutes} menit yang lalu`
      else timeText = 'Baru saja'

      return {
        ...job,
        timeDifference: timeText
      }
    })

    const context = {
      user,
      jobs: jobsMap,
      currentPage: page,
      totalPages,
      totalItems,
      limit,
      search
    }

    const title = 'List of Job Interviews'

    res.status(200).render('interview/index', {
      context,
      title,
      layout,
      formatCurrency
    })

  } catch (error) {
    console.error('Error in getJobInterview:', error)
    res.status(500).render('error/error', err500)
  }
}

const getDetailJobInterview = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)

    if (!user) {
      return res.status(404).render('error/error', err404)
    }

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 9
    const search = req.query.search || ''

    const jobData = await jobModel.getOne(req.params.id)

    if (!jobData) {
      return res.status(404).render('error/error', err404)
    }

    const { jobInterviews, totalItems } = await interviewModel.getDetailJobInterview(
      req.params.id, page, limit, search
    )

    const totalPages = Math.ceil(totalItems / limit)

    const updatedAt = moment(jobData.updated_at)
    const now = moment()

    let timeText = ''
    const diffInYears = now.diff(updatedAt, 'years')
    const diffInMonths = now.diff(updatedAt, 'months')
    const diffInWeeks = now.diff(updatedAt, 'weeks')
    const diffInDays = now.diff(updatedAt, 'days')
    const diffInHours = now.diff(updatedAt, 'hours')
    const diffInMinutes = now.diff(updatedAt, 'minutes')

    if (diffInYears >= 1) timeText = `${diffInYears} tahun yang lalu`
    else if (diffInMonths >= 1) timeText = `${diffInMonths} bulan yang lalu`
    else if (diffInWeeks >= 1) timeText = `${diffInWeeks} minggu yang lalu`
    else if (diffInDays >= 1) timeText = `${diffInDays} hari yang lalu`
    else if (diffInHours >= 1) timeText = `${diffInHours} jam yang lalu`
    else if (diffInMinutes >= 1) timeText = `${diffInMinutes} menit yang lalu`
    else timeText = 'Baru saja'

    const context = {
      user,
      timeDifference: timeText,
      job: {
        ...jobData,
        timeDifference: timeText
      },
      jobInterviews,
      currentPage: page,
      totalPages,
      totalItems,
      limit,
      search
    }

    const title = 'List Interviews for ' + jobData.title + ' Vacancy'

    res.status(200).render('interview/detail', {
      context,
      title,
      layout
    })

  } catch (error) {
    console.error('Error in getDetailJobInterview:', error)
    res.status(500).render('error/error', err500)
  }
}

module.exports = {
  getJobInterview, getDetailJobInterview
}