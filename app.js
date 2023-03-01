var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

var indexRouter = require('./routes/index')

var app = express()

logger.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  logger(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// Enable All CORS Requests
app.use(cors())

app.use('/', indexRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'NullError') {
    return response.status(500).send({ error: "person doesn't exist" })
  }

  next(error)
}

app.use(errorHandler)

module.exports = app
