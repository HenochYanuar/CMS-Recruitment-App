const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)


const create = async (data) => {
  try {
    return await db('tags').insert(data)

  } catch (error) {
    console.error(error.message)
    throw new Error('Error failed to save tags')

  }
}

const getOne = async (id) => {
  try {
    return await db('tags').where({ id }).first()

  } catch (error) {
    console.error(error.message)
    throw new Error('Error geting a tags by id')

  }
}

const deleteTags = async (id) => {
  try {
    return await db('tags').where({ id }).del()

  } catch (error) {
    throw new Error('Error deleting tags by id')

  }
}

module.exports = {
  create, getOne, deleteTags
}