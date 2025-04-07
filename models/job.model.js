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

// const getAllJobs = async () => {
//   try {
//     return await db('jobs').select()

//   } catch (error) {
//     throw new Error('Error getting all jobs')
    
//   }
// }
const getAllJobs = async (page, limit, search) => {
  try {
    const offset = (page - 1) * limit

    const jobs = await db('jobs')
      .where(function () {
        if (search) {
          this.where(db.raw('LOWER(title)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(description)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(type)'), 'like', `%${search.toLowerCase()}%`)
        }
      })
      .orderBy('updated_at', 'desc')
      .limit(limit)
      .offset(offset)

    const [{ count }] = await db('jobs')
      .where(function () {
        if (search) {
          this.where(db.raw('LOWER(title)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(description)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(type)'), 'like', `%${search.toLowerCase()}%`)
        }
      })
      .count('jobs.id as count')

    return { jobs, totalItems: parseInt(count) }

  } catch (error) {
    throw new Error('Error getting all news jobs' + error.message)
  }
}

module.exports = {
  getCountAll, getAllJobs
}