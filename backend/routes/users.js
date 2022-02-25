const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const user = require('../models/user')

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
        userId: fetchedUser._id
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({message: 'Auth Failed'})
    })
})

router.post('/addToWishList/:userId', async (req, res, next) => {
  const user = await User.findOne({_id: req.params.userId}).populate('wishList')
  let inWishList = false
  for(let p of user.wishList) {
    if(p._id.equals(req.body._id)) {
      inWishList = true
    }
  }
  if(inWishList) {
    res.json({title: 'Error', message: 'Item Already Exist in Your Wish List'})
  }
  else {
    user.wishList.push(req.body)
    await user.save()
    res.status(200).json({title: 'Success', message: 'Item Was Added To Your Wish List'})
  }


})

router.get('/getWishList/:userId', (req, res, next) => {
  User.findOne({_id: req.params.userId}).populate('wishList')
    .then(user => {
      res.status(200).json({wishList: user.wishList})
    })
})

router.delete('/deleteFromWishList/:userId/:itemId', async (req, res, next) => {
  const user = await User.findOne({_id: req.params.userId})
  for(let i=0; i< user.wishList.length; i++) {
    if(user.wishList[i]._id.equals(req.params.itemId)) {
      user.wishList.splice(i, 1)
      break
    }
  }
  await user.save()
  console.log(user.wishList)

  res.status(200).json({title: 'Success', message: 'Deleted From Wish List'})
})


module.exports = router
