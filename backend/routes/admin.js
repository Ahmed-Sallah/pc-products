const express = require('express')

const router = express.Router()

const Component = require('../models/product')


router.get('/admin/get-products', (req, res, next) => {
  Component.find({})
    .then(products => {
      res.status(200).json({message: 'Successfully Fetched Products', products})
    }).catch(err => {
      console.log(err)
    })
})



module.exports = router
