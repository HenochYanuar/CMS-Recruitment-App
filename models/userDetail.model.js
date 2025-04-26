const knex = require('knex')
const knexConfig = require('../config/knexfile')

const environment = process.env.NODE_ENV || 'development'
const db = knex(knexConfig[environment])

const getDetailUser = async (id) => {
  try {
    return await db('users')
    .join('user_details', 'users.id', 'user_details.user_id')
    .where('users.id', id).first()

  } catch (error) {
    throw new Error('Error finding user by id')

  }
}

module.exports = {
  getDetailUser
}