const jwt = require('jsonwebtoken')
const { secret } = require('../config/jwt')

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token_admin

  if (token) {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      if (user.role !== 'admin') {
        return res.status(403).send('Forbidden: Admins only')
      }

      req.user = user 
      next()
    })
  } else {
    res.status(401).redirect('/admin/login')  
  }
}

module.exports = authenticateJWT