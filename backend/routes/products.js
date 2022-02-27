const express = require('express')
const router = express.Router()

const Component = require('../models/product')
const Order = require('../models/order')
const User = require('../models/user')

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

router.post('/add-order', async (req, res, next) => {
  const user = await User.findById(req.body.userId)
  const newOrder = new Order({
    address: {governorate: req.body.address.gover, area: req.body.address.area, street: req.body.address.street},
    items: req.body.items,
    user: user
  })
  await newOrder.save()
  res.status(201).json({message: 'Order Was Added!'})
})

module.exports = router
