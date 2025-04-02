const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { secret, expiresIn } = require('../config/jwt')
const { err500, err404 } = require('../utils/error')
const userModel = require('../models/user.model')

const login = (req, res) => {
  res.status(200).render('login/login', { message: '' })
}

const loginPost = async (req, res) => {

  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).render('login/login', { message: 'Username and password are required' })
    }

    let user = await userModel.findByEmail(email)
    
    if (!user) {
      res.status(400).render('login/login', { message: 'Your email is not registered' })
      
    } else {
      const isValid = await bcrypt.compare(password, user.password)
      
      if (email === user.email && isValid === true) {
        if (user.isRegister === true) {
          
          if (user.role === 'user') {
            res.status(400).render('login/login', { message: 'This account is not admin role' })
          }

          const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, secret, { expiresIn })

          res.cookie('token_admin', token, { 
            httpOnly: true,
            secure: true,
            maxAge: 10800000 
          })
 
          res.status(200).redirect('/admin/dashboard')

        } else {
          res.status(400).render('login/login', { message: 'Your email has not been activated, please activate it first' })

        }
      } else {
        res.status(400).render('login/login', { message: 'Your email or password is incorrect' })

      }
    }

  } catch (error) {
    console.error('Error in loginPost:', error)
    res.status(500).render('error/error', err500)

  }
}

const logoutPost = (req, res) => {
  try {
    res.clearCookie('token_admin')
    res.status(200).redirect('/admin/login')

  } catch (error) {
    console.error('Error in logoutPost:', error)
    res.status(500).render('error/error', err500)

  }
}

module.exports = {
  login, loginPost, logoutPost
}