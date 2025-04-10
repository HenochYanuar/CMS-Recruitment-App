const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)

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