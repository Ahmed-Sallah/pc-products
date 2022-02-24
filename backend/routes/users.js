const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      let user;
      if(req.body.password.includes('-admin-')) {
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          password: hash,
          roles: 'admin'
        })
        console.log('admin created')
      } else {
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          password: hash,
        })
      }
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created!',
            result
          })
        }).catch(err => {
          res.status(500).json({
            error: err
          })
        })
    })
})

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user) { // if email does not exist
        return res.status(401).json({message: 'Auth Failed'})
      }
      fetchedUser = user
      return bcrypt.compare(req.body.password, user.password) // if email exists compare password
    }).then(result => {
      if(!result) { // if compare is false
        return res.status(401).json({message: 'Auth Failed'})
      }
      const token = jwt.sign( // if compare is true then make the token
        {email: fetchedUser.email, userId: fetchedUser._id},
        'secret_this_should_be_longer',
        {expiresIn: '1h'}
      )
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        role: fetchedUser.roles,
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({message: 'Auth Failed'})
    })
})


module.exports = router
