const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')

app.use(cors())
app.use(express.json())

app.use('', productsRoutes)
app.use('', usersRoutes)
app.use('', adminRoutes)

mongoose.connect('mongodb://localhost:27017/pc-components')
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
