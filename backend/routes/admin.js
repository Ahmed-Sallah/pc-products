const express = require('express')

const router = express.Router()

const Component = require('../models/product')
const User = require('../models/user')


router.get('/admin/get-products', (req, res, next) => {
  Component.find({})
    .then(products => {
      res.status(200).json({message: 'Successfully Fetched Products', products})
    }).catch(err => {
      console.log(err)
    })
})

router.post('/admin/add-product', (req, res, next) => {
  const product = new Component({type: req.body.type, name: req.body.name, price: req.body.price, brand: req.body.brand, image: req.body.image, availability: req.body.availability})
  product.save()
    .then(response => {
      res.status(200).json({title: 'Success', message: 'Product Was Added'})
    })
})

router.delete('/admin/delete-product/:productId', (req, res, next) => {
  Component.deleteOne({_id: req.params.productId})
    .then(result => {
      res.status(200).json({title: 'Success', message: 'Successfully Deleted'})
    })
})

router.get('/admin/get-accounts', (req, res, next) => {
  User.find({roles: ['user']})
    .then(users => {
      res.status(200).json({users})
    })
})

router.delete('/admin/delete-account/:accId', (req, res, next) => {
  User.deleteOne({_id: req.params.accId})
    .then(result => {
      res.status(200).json({title: 'Success', message: 'Successfully Deleted'})
    })
})



module.exports = router
