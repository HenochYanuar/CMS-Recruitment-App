const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)

const findByJobId = async (jobId, page, limit, search) => {
  try {
    const offset = (page - 1) * limit

    const applications = await db('applications')
      .join('users', 'applications.user_id', 'users.id')
      .leftJoin('resumes', 'users.id', 'resumes.user_id')
      .select(
        'applications.*',
        'users.username as username',
        'users.email as email',
        'resumes.file_url as file_url'
      )
      .where('applications.job_id', jobId)
      .andWhere(function () {
        if (search) {
          this.whereRaw('LOWER(status) LIKE ?', [`%${search.toLowerCase()}%`])
            .orWhereRaw('LOWER(username) LIKE ?', [`%${search.toLowerCase()}%`])
            .orWhereRaw('LOWER(email) LIKE ?', [`%${search.toLowerCase()}%`])
        }
      })
      .orderBy('applications.updated_at', 'desc')
      .limit(limit)
      .offset(offset)

    const [{ count }] = await db('applications')
      .join('users', 'applications.user_id', 'users.id')
      .leftJoin('resumes', 'users.id', 'resumes.user_id')
      .where('applications.job_id', jobId)
      .andWhere(function () {
        if (search) {
          this.whereRaw('LOWER(status) LIKE ?', [`%${search.toLowerCase()}%`])
            .orWhereRaw('LOWER(username) LIKE ?', [`%${search.toLowerCase()}%`])
            .orWhereRaw('LOWER(email) LIKE ?', [`%${search.toLowerCase()}%`])
        }
      })
      .count('applications.id as count')

    return {
      applications,
      totalItems: parseInt(count)
    }

  } catch (error) {
    throw new Error('Error getting all applications: ' + error.message)
  }
}

module.exports = {
  findByJobId
}