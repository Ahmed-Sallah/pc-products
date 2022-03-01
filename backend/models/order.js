const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  address: {
    governorate: {type: String, required: true},
    area: {type: String, required: true},
    street: {type: String, required: true},
  },
  orderDate: {type: Date, default: Date.now()},
  items: [{name: String, brand: String, price: Number, quantity: Number, image: String}],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})


module.exports = mongoose.model('Order', OrderSchema)
