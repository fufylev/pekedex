const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pokemonSchema = new Schema({
  _id: Number,
  name: { type: String },
  likes: [{
    user: { type: String },
    timestamp: { type: Date, default: new Date() }
  }]
})

module.exports = mongoose.model('Pokemon', pokemonSchema, 'pokemons')
