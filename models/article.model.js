const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)

const getCountAll = async () => {
  try {
    return await db('articles').count('id as count').first()

  } catch (error) {
    throw new Error('Error getting all news articles')

  }
}

const getAllArticles = async (page, limit, search) => {
  try {
    const offset = (page - 1) * limit

    const articles = await db('articles')
      .select(
        'articles.*',
        'tags.tag as tag_name'
      )
      .leftJoin('tags', 'articles.tags_id', 'tags.id')
      .where(function () {
        if (search) {
          this.where(db.raw('LOWER(title)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(content)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(category)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(tags.tag)'), 'like', `%${search.toLowerCase()}%`)
        }
      })
      .orderBy('updated_at', 'desc')
      .limit(limit)
      .offset(offset)

    const [{ count }] = await db('articles')
      .leftJoin('tags', 'articles.tags_id', 'tags.id')
      .where(function () {
        if (search) {
          this.where(db.raw('LOWER(title)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(content)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(category)'), 'like', `%${search.toLowerCase()}%`)
            .orWhere(db.raw('LOWER(tags.tag)'), 'like', `%${search.toLowerCase()}%`)
        }
      })
      .count('articles.id as count')

    return { articles, totalItems: parseInt(count) }

  } catch (error) {
    throw new Error('Error getting all news articles' + error.message)
  }
}

const create = async (data) => {
  try {
    return await db('articles').insert(data)

  } catch (error) {
    throw new Error('Error failed create new article')

  }
}

const getOne = async (id) => {
  try {
    return await db('articles').where({ id }).first()

  } catch (error) {
    throw new Error('Error geting a article by id')

  }
}

const deleteArticle = async (id) => {
  try {
    return await db('articles').where({ id }).del()

  } catch (error) {
    throw new Error('Error deleting article by id')

  }
}

module.exports = {
  getAllArticles, create, getOne, deleteArticle, getCountAll
}