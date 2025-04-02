const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)

const getCountAll = async (interviewStatus) => {
  try {
    return await db('interviews').where({ status: interviewStatus }).count('id as count').first()

  } catch (error) {
    throw new Error('Error getting all interviews schedule')

  }
}


module.exports = {
  getCountAll
}