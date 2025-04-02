const userModel = require('../models/user.model')
const { err500, err404 } = require('../utils/error')

const layout = 'layout/index'

const getAllUsers = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search || ''
    const role = 'user'

    const { users, totalItems } = await userModel.getAllUsers(role, page, limit, search)

    const totalPages = Math.ceil(totalItems / limit)

    const context = {
      user,
      users,
      currentPage: page,
      totalPages,
      totalItems,
      limit,
      search
    }

    const title = 'Users List'

    res.status(200).render('Users/index', { context, title, layout })

  } catch (error) {
    console.error('Error in getAllUsers:', error)
    res.status(500).render('error/error', err500)
  }
}

module.exports = {
  getAllUsers
}