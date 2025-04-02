const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)

const getCountAll = async (isExpired) => {
  try {
    return await db('jobs').where({ isExpired }).count('id as count').first()
    
  } catch (error) {
    throw new Error('Error getting all jobs')
    
  }
}

module.exports = {
  getCountAll
}