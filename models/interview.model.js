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

const getAllJobsInterview = async (page, limit, search) => {
  try {
    const offset = (page - 1) * limit

    const jobs = await db('jobs')
      .join('applications', 'jobs.id', 'applications.job_id')
      .join('interviews', 'applications.id', 'interviews.application_id')
      .join('users', 'applications.user_id', 'users.id')
      .leftJoin('user_details', 'users.id', 'user_details.user_id')
      .select(
        'jobs.*',
        'users.id as user_id',
        'users.username',
        'users.email',
        'user_details.name',
        'user_details.phone',
        'user_details.address',
      )
      .count('interviews.id as interview_count')
      .where(function () {
        if (search) {
          this.where(db.raw('LOWER(jobs.title)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(jobs.description)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(jobs.type)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(users.username)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(users.email)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.name)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.phone)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.address)'), 'like', `%${search.toLowerCase()}%`)
        }
      })
      .groupBy(
        'jobs.id',
        'users.id',
        'users.username',
        'users.email',
        'user_details.name',
        'user_details.phone',
        'user_details.address'
      )
      .orderBy('jobs.updated_at', 'desc')
      .limit(limit)
      .offset(offset)

    const [{ count }] = await db('jobs')
      .join('applications', 'jobs.id', 'applications.job_id')
      .join('interviews', 'applications.id', 'interviews.application_id')
      .join('users', 'applications.user_id', 'users.id')
      .leftJoin('user_details', 'users.id', 'user_details.user_id')
      .where(function () {
        if (search) {
          this.where(db.raw('LOWER(jobs.title)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(jobs.description)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(jobs.type)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(users.username)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(users.email)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.name)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.phone)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.address)'), 'like', `%${search.toLowerCase()}%`)
        }
      })
      .countDistinct('jobs.id as count')

    return { jobs, totalItems: parseInt(count) }
  } catch (error) {
    throw new Error('Error getting jobs with interviews, users, and user_details: ' + error.message)
  }
}

const getDetailJobInterview = async (jobId, page, limit, search) => {
  try {
    const offset = (page - 1) * limit;

    const jobs = await db('jobs')
      .leftJoin('applications', 'jobs.id', 'applications.job_id')
      .leftJoin('interviews', 'applications.id', 'interviews.application_id')
      .join('users', 'applications.user_id', 'users.id')
      .leftJoin('user_details', 'users.id', 'user_details.user_id')
      .select(
        'jobs.*',
        'interviews.interview_date',
        'interviews.status as interview_status',
        'interviews.location',
        'users.id as user_id',
        'users.username',
        'users.email',
        'user_details.name',
        'user_details.phone',
        'user_details.address'
      )
      .count('interviews.id as interview_count')
      .where('jobs.id', jobId)
      .andWhere(function () {
        if (search) {
          this.where(db.raw('LOWER(users.username)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(users.email)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.name)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.phone)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.address)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(interviews.status)'), 'like', `%${search.toLowerCase()}%`)
        }
      })
      .groupBy(
        'jobs.id',
        'users.id',
        'users.username',
        'users.email',
        'interviews.interview_date',
        'interviews.status',
        'interviews.location',
        'user_details.name',
        'user_details.phone',
        'user_details.address',
        'interviews.updated_at'
      )
      .orderBy('interviews.updated_at', 'desc')
      .limit(limit)
      .offset(offset);

    const [{ count }] = await db('jobs')
      .leftJoin('applications', 'jobs.id', 'applications.job_id')
      .leftJoin('interviews', 'applications.id', 'interviews.application_id')
      .join('users', 'applications.user_id', 'users.id')
      .leftJoin('user_details', 'users.id', 'user_details.user_id')
      .where('jobs.id', jobId)
      .andWhere(function () {
        if (search) {
          this.where(db.raw('LOWER(users.username)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(users.email)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.name)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.phone)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(user_details.address)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(interviews.status)'), 'like', `%${search.toLowerCase()}%`)
        }
      })
      .countDistinct('users.id as count');

    return {
      jobInterviews: jobs,
      totalItems: parseInt(count)
    };
  } catch (error) {
    throw new Error('Error getting detail job interview : ' + error.message);
  }
};



const getOne = async (id) => {
  try {
    return await db('interviews').where({ id }).first()

  } catch (error) {
    throw new Error('Error getting one interview schedule')

  }
}

const createInterview = async (data) => {
  try {
    return await db('interviews').insert(data)

  } catch (error) {
    throw new Error('Error creating interview: ' + error.message)
  }
}

const deleteInterview = async (id) => {
  try {
    return await db('interviews').where({ id }).del()

  } catch (error) {
    throw new Error('Error deleting interview schedule by id')

  }
}


module.exports = {
  getCountAll, getAllJobsInterview, createInterview, getOne, deleteInterview, getDetailJobInterview
}