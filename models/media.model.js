const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)


const create = async (data) => {
  try {
    return await db('media').insert(data)

  } catch (error) {
    throw new Error('Error failed to save media article')

  }
}

const deleteMedia = async (id) => {
  try {
    return await db('media').where({ id }).del()

  } catch (error) {
    throw new Error('Error deleting meia by id')

  }
}

module.exports = {
  create, deleteMedia
}