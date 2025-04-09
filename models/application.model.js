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

const getDetailUser = async (jobId, userId) => {
  try {
    return await db('users')
      .join('user_details', 'users.id', 'user_details.user_id')
      .leftJoin('resumes', 'users.id', 'resumes.user_id')
      .leftJoin('applications', 'users.id', 'applications.user_id')
      .select(
        'users.*',
        'user_details.name as name',
        'user_details.phone as phone',
        'user_details.address as address',
        'resumes.file_url as file_url',
        'applications.status as status',
      )
      .where('users.id', userId)
      .andWhere('applications.job_id', jobId)
      .first() 

  } catch (error) {
    throw new Error('Error getting user with detail: ' + error.message)
  }
}

const updateStatusApplication = async (applicationId, status) => {
  try {
    return await db('applications')
      .where('id', applicationId)
      .update({ status })
      .returning('*')
      
  } catch (error) {
    throw new Error('Error updating application status: ' + error.message)
  }
}

module.exports = {
  findByJobId, getDetailUser, updateStatusApplication
}