const express = require('express')
const router = express.Router()

const Component = require('../models/product')

router.get('/products/:type', (req, res, next) => {
  const type = req.params.type
  Component.find({type: type})
    .then((products) => {
      res.status(200).json({message: 'Products Fetched Successfully', products})
    })
})

router.get('/products/:type/:id', (req, res, next) => {
  const id = req.params.id
  Component.findById(id)
    .then((product) => {
      res.status(200).json({message: 'Product Found', product})
    })
})

module.exports = router
