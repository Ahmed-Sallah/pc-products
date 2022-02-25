const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now()
  },
  wishList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Component', required: true}],
  roles: {
    type: [{
        type: String,
        enum: ['user', 'admin']
    }],
    default: ['user']
  }
})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function (next) {
  // Capitalize
  this.firstName = this.firstName.trim()[0].toUpperCase() + this.firstName.slice(1).toLowerCase();
  this.lastName = this.lastName.trim()[0].toUpperCase() + this.lastName.slice(1).toLowerCase();
  next();
});

module.exports = mongoose.model('User', userSchema)
