const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)

const findByEmail = async (email) => {
  try {
    return await db('users').where({ email }).first()

  } catch (error) {
    throw new Error('Error finding user by email')

  }
}

const getCountAll = async (role, userRegist, userNotRegist) => {
  try {
    const registUser = await db('users').where({ role }).andWhere({isRegister: userRegist}).count('id as count').first()
    const notRegistUser = await db('users').where({ role }).andWhere({isRegister: userNotRegist}).count('id as count').first()

    return {
      registUser, notRegistUser
    }
    
  } catch (error) {
    throw new Error('Error getting all users')
    
  }
}

const getAllUsers = async (role, page, limit, search) => {
  try {
    const offset = (page - 1) * limit

    const isRegisterCondition = (search.toLowerCase() === 'true') ? true : (search.toLowerCase() === 'false' ? false : null)

    const users = await db('users')
      .where(function() {
        if (search) {
          this.where(db.raw('LOWER(username)'), 'like', `%${search.toLowerCase()}%`)
              .orWhere(db.raw('LOWER(name)'), 'like', `%${search.toLowerCase()}%`)
              .orWhere(db.raw('LOWER(email)'), 'like', `%${search.toLowerCase()}%`)

              if (isRegisterCondition !== null) {
                this.orWhere('isRegister', isRegisterCondition);
              }
        }
      })
      .andWhere({ role })
      .orderBy('updated_at', 'desc')
      .limit(limit)
      .offset(offset)

    const [{ count }] = await db('users')
      .where(function() {
        if (search) {
          this.where(db.raw('LOWER(username)'), 'like', `%${search.toLowerCase()}%`)
              .orWhere(db.raw('LOWER(name)'), 'like', `%${search.toLowerCase()}%`)
              .orWhere(db.raw('LOWER(email)'), 'like', `%${search.toLowerCase()}%`)
              
              if (isRegisterCondition !== null) {
                this.orWhere('isRegister', isRegisterCondition);
              }
        }
      }) 
      .andWhere({ role })
      .count('id as count')

    return { users, totalItems: parseInt(count) }

  } catch (error) {
    console.error('Detailed Error in getAllUsers Model:', error.message)
    throw new Error('Error getting all users')
  }
}

module.exports = {
  findByEmail, getAllUsers, getCountAll
}