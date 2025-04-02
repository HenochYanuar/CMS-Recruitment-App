const userModel = require('../models/user.model')
const articleModel = require('../models/article.model')
const { err500, err404 } = require('../utils/error')
const layout = 'layout/index'

const dashboard = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)
    const articles = await articleModel.getCountAll()

    const role  = 'user'
    const userRegist = true
    const userNotRegist = false

    const users = await userModel.getCountAll(role, userRegist, userNotRegist)

    const context = {
      user, articles, users
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