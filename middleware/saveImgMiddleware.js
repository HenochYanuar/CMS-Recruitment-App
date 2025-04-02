const multer = require('multer')
const path = require('path')

const articleImgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/articles_image/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + 'Article' + '-' + Date.now() + path.extname(file.originalname))
  }
})

const articleImage = multer({ storage : articleImgStorage })

module.exports = { 
  uploadArticelImg: articleImage.single('foto')
 }