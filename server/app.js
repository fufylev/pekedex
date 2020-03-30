const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use('/users', require('./routes/users'))

app.listen(5000)
console.log('Server listening at 5000')
