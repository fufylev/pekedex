const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(path.resolve(__dirname, 'public')))

const SECRET = 'The doors are open for those how are bold enough to knock'

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ')
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Wrong token' })
      }
      req.user = decoded
      next()
    })
  } else {
    res.status(401).json({ message: 'No token present' })
  }
}

const User = require('./models/user')
// const Pokemon = require('./models/pokemons')

app.post('/register', async (req, res) => {
  const checkMail = await User.findOne({
    email: req.body.email
  })
  /* const checkMobile = await User.findOne({
    mobile: req.body.mobile
  }) */
  if (!checkMail) {
    const user = new User(req.body)
    await user.save()
    return res.json({
      result: 'success'
    })
  }
  res.json({
    result: 'This user already exists'
  })
})

app.post('/auth', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  if (!user) {
    return res.json({
      result: 'This user doesn\'t exist'
    })
  }
  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    return res.json({
      result: 'Incorrect password'
    })
  }
  const identity = {
    id: user._id,
    email: user.email
  }
  const token = jwt.sign(identity, SECRET)
  res.json({
    result: 'success',
    token,
    email: user.email,
    name: user.name,
    id: user._id
  })
})

// app.all('/api*', verifyToken)

app.get('/user/:id', async (req, res) => {
  let user = await User.findById(req.params.id)
  user = user.toObject()

  delete user.password

  res.json(user)
})

app.post('/api/pokemons/bookmarked/:id', async (req, res) => {
  console.log('WE ARE HERE')
  let user = await User.findById(req.params.id)
  console.log('USET - ')
  console.log(user)
  user = user.toObject()
  if (user) {
    const ifLiked = user.bookMarkedPokemons.some(bookMarkedPokemon =>
      bookMarkedPokemon.id === req.body.pokemonID
    )
    console.log('ifLiked - ')
    console.log(ifLiked)
    if (ifLiked) {
      user.bookMarkedPokemons = user.bookMarkedPokemons.map(bookMarkedPokemon => {
        if (bookMarkedPokemon.id === req.body.pokemonID) {
          bookMarkedPokemon.ifLiked = !bookMarkedPokemon.ifLiked
        }
        return bookMarkedPokemon
      })
    } else {
      user.bookMarkedPokemons = [
        ...user.bookMarkedPokemons,
        {
          id: req.body.pokemonID,
          ifLiked: false
        }
      ]
    }
    await user.save()
    return res.json({
      result: 'success'
    })
  }
  res.json(user)
})

/* app.post('/register', async (req, res) => {
  const checkMail = await User.findOne({
    email: req.body.email
  })
  if (!checkMail) {
    const user = new User(req.body)
    await user.save()
    return res.json({
      result: 'success'
    })
  }
  res.json({
    result: 'This user already exists'
  })
}) */

app.listen(8888, () => {
  console.log('Server on port 8888 has been started!')
})
