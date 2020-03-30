const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const CRYPT_STEPS = 12

const Schema = mongoose.Schema

const userSchema = new Schema({
  mobile: { type: String },
  email: {
    type: String,
    lowercase: true
  },
  name: { type: String },
  password: { type: String },
  bookMarkedPokemons: { type: Array } // [ { id: pokemonID, ifLiked: false } ]
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, CRYPT_STEPS)
  }
  next()
})

userSchema.methods.comparePassword = async function (candidate) {
  return await bcrypt.compare(candidate, this.password)
}

module.exports = mongoose.model('User', userSchema, 'users')
