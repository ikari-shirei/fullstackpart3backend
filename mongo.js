const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://secure-gate-keeper:${password}@cluster.ca5xagw.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model(`Person`, personSchema)

const newPerson = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

newPerson.save().then(() => {
  console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
  mongoose.connection.close()
})

Person.find({}).then((result) => {
  console.log(result)
  mongoose.connection.close()
})
