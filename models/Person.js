const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DB_URL

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true, unique: true },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /\d+/g.test(v)
      },
      message: (props) => `${props.value} is not a number!`,
    },
  },
})

const Person = mongoose.model(`Person`, personSchema)

module.exports = Person
