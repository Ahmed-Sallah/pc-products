const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const Component = require('./models/product')

app.use(cors())

mongoose.connect('mongodb://localhost:27017/pc-components')
  .then(() => {
    console.log('DATABASE CONNECTED')
  })
  .catch(err => {
    console.log('CONNECTION FAILED')
    console.log(err)
  })

app.get('/products/:type', (req, res, next) => {
  const type = req.params.type
  Component.find({type: type})
    .then((products) => {
      res.status(200).json({message: 'Products Fetched Successfully', products})
    })
})

app.listen(3000, () => {
  console.log('Serving on port 3000')
})
