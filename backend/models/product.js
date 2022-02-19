const mongoose = require('mongoose')

const ComponentSchema = new mongoose.Schema({
  type: {
    type: ['motherboards', 'cpu', 'ram', 'ssd', 'hdd', 'gpu', 'case', 'psu', 'fans-cooler', 'monitor', 'accessories'],
    required: true
  },
  name: {type: String, required: true},
  price: {type: Number, required: true},
  brand: {type: String, required: true},
  image: {type: String, required: true},
  availability: {type: Boolean, required: true}
})


module.exports = mongoose.model('Component', ComponentSchema)
