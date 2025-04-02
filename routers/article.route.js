const express = require('express')
const authenticateJWT = require('../middleware/authMiddleware')
const articleController = require('../controllers/article.controller')

const articleRouter = express.Router()

articleRouter.use(authenticateJWT)

articleRouter.get('/articles', articleController.getAllArticles)
articleRouter.get('/articles/add', articleController.formAddArticle)
articleRouter.post('/articles', articleController.uploadMiddleware, articleController.postAddArticle)
articleRouter.get('/articles/:id', articleController.getDetailArticle)
articleRouter.delete('/articles/:id', articleController.deleteArticle)


module.exports = {
  articleRouter
}