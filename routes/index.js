var express = require('express')
var router = express.Router()
let persons = require('../persons')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('hello')
})

router.get('/api/persons', function (req, res, next) {
  res.json(persons)
})

router.get('/api/persons/:id', function (req, res, next) {
  const targetId = req.params.id
  const targetPerson = persons.find(
    (person) => Number(person.id) === Number(targetId)
  )

  if (targetPerson) {
    res.json(targetPerson)
  }

  res.status(404).end()
})

router.delete('/api/persons/:id', function (req, res, next) {
  const targetId = req.params.id
  const targetPerson = persons.find(
    (person) => Number(person.id) === Number(targetId)
  )

  if (targetPerson) {
    persons = persons.filter((person) => person.id !== targetPerson.id)

    res.status(204).end()
  }

  res.status(404).end()
})

router.post('/api/persons', function (req, res, next) {
  const name = req.body.name
  const number = req.body.number
  const isNameExists = persons.find((person) => person.name === name)

  if (!name) {
    res.status(400)
    res.json({ error: 'name is required' })
  }

  if (!number) {
    res.status(400)
    res.json({ error: 'number is required' })
  }

  if (isNameExists) {
    res.status(400)
    res.json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: Math.round(Math.random() * 10000),
    name: name,
    number: number,
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)

  res.status(404).end()
})

router.get('/info', function (req, res, next) {
  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p>
     <p>${new Date()}</p>`
  )
})

module.exports = router
