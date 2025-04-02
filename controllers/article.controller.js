const userModel = require('../models/user.model')
const articleModel = require('../models/article.model')
const mediaModel = require('../models/media.model')
const tagsModel = require('../models/tags.model')
const saveImgMiddleware = require('../middleware/saveImgMiddleware')
const idCreator = require('../utils/idCreator')
const { err500, err404 } = require('../utils/error')

const layout = 'layout/index'

const getAllArticles = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search || ''

    const { articles, totalItems } = await articleModel.getAllArticles(page, limit, search)

    const totalPages = Math.ceil(totalItems / limit)

    const context = {
      user,
      articles,
      currentPage: page,
      totalPages,
      totalItems,
      limit,
      search
    }

    const title = 'News Articles List'

    res.status(200).render('articles/index', { context, title, layout })

  } catch (error) {
    console.error('Error in getAllArticles:', error)
    res.status(500).render('error/error', err500)
  }
}

const formAddArticle = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)

    const categories = [
      'Politik', 'Ekonomi', 'Teknologi', 'Olahraga', 'Kesehatan',
      'Pendidikan', 'Hiburan', 'Sains', 'Lingkungan', 'Kriminalitas',
      'Travel & Wisata', 'Pendidikan', 'Keuangan'
    ]

    const context = {
      user, categories
    }

    const title = 'Form Add News Article'

    res.status(200).render('articles/formAdd', { context, title, layout })

  } catch (error) {
    console.error('Error in formAddArticle:', error)
    res.status(500).render('error/error', err500)
  }
}

const postAddArticle = async (req, res) => {
  try {
    let { articleTitle, content, category, tags } = req.body

    category = category[0] === "Lainnya" ? category = category[1] : category = category

    const foto = req.file.filename

    const id = idCreator.createID()

    await tagsModel.create({
      id,
      tag: tags
    })

    await articleModel.create({
      id,
      title: articleTitle,
      content,
      image_url: `/img/articles_image/${foto}`,
      category,
      tags_id: id,
      foto
    })

    await mediaModel.create({
      id,
      file_name: foto,
      foto,
      file_url: `/img/articles_image/${foto}`
    })

    res.status(201).redirect('/admin/articles')

  } catch (error) {
    console.error('Error in postAddArticle:', error)
    res.status(500).render('error/error', err500)
  }
}

const uploadMiddleware = saveImgMiddleware.uploadArticelImg

const getDetailArticle = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)
    const article = await articleModel.getOne(req.params.id)
    let tags = await tagsModel.getOne(req.params.id)
    
    if (!article) {
      res.status(404).render('error/error', err404)
      return
    }
    
    tags = tags.tag
    
    const tagsArray = tags
    .replace(/[{}]/g, '') 
    .split(',')
    .map(item => item.trim().replace(/['" ]/g, ""))

    const context = {
      user, 
      article,
      tag: tagsArray
    }

    const title = 'Detail News Articel'

    return res.status(200).render('articles/detail', { context, title, layout })

  } catch (error) {
    console.error('Error in getDetailArticle:', error)
    res.status(500).render('error/error', err500)
  }
}

const deleteArticle = async (req, res) => {
  try {
    const id = await req.params.id

    const article = await articleModel.getOne(id)

    if (!article) {
      res.status(404).render('error/error', err404)
      return
    }

    await articleModel.deleteArticle(id)

    await mediaModel.deleteMedia(id)

    await tagsModel.deleteTags(id)

    return res.status(201).redirect('/admin/articles')
  } catch (error) {
    console.error('Error in deleteArticle:', error)
    res.status(500).render('error/error', err500)
  }
}

module.exports = {
  getAllArticles, formAddArticle, postAddArticle, uploadMiddleware, getDetailArticle, deleteArticle
}