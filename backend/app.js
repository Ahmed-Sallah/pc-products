const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost:27017/pc-products')
  .then(() => {
    console.log('DATABASE CONNECTED')
  })
  .catch(err => {
    console.log('CONNECTION FAILED')
    console.log(err)
  })

app.listen(3000, () => {
  console.log('Serving on port 3000')
})
