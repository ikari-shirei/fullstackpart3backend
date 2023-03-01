var express = require('express')
var router = express.Router()
let Person = require('../models/Person')

router.get('/api/persons', function (req, res, next) {
  Person.find({})
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      return next(err)
    })
})

router.get('/api/persons/:id', function (req, res, next) {
  const targetId = req.params.id

  Person.findById(targetId)
    .then((result) => {
      if (!result) {
        const err = new Error()
        err.name = 'NullError'
        return next(err)
      }
      res.json(result)
    })
    .catch((err) => {
      return next(err)
    })
})

router.delete('/api/persons/:id', function (req, res, next) {
  const targetId = req.params.id

  Person.findByIdAndDelete({ _id: targetId })
    .then((result) => {
      res.status(204).end()
    })
    .catch((err) => {
      return next(err)
    })
})

router.post('/api/persons', function (req, res, next) {
  const name = req.body.name
  const number = req.body.number

  Person.find({ name: name })
    .then((result) => {
      const newPerson = new Person({
        name: name,
        number: number,
      })

      newPerson
        .save()
        .then((result) => {
          console.log(
            `added ${newPerson.name} number ${newPerson.number} to phonebook`
          )

          res.json(newPerson)
        })
        .catch((err) => {
          return next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.put('/api/persons/:id', function (req, res, next) {
  const targetId = req.params.id
  const number = req.body.number

  Person.findById({ _id: targetId })
    .then((result) => {
      const newPerson = Person({
        _id: result._id,
        name: result.name,
        number: number,
      })

      newPerson.validate().catch((err) => {
        return next(err)
      })

      Person.findByIdAndUpdate(targetId, newPerson, { new: true })
        .then((result) => {
          res.json(result)
        })
        .catch((err) => {
          return next(err)
        })
    })
    .catch((err) => {
      return next(err)
    })
})

router.get('/info', function (req, res, next) {
  Person.find({})
    .then((result) => {
      res.send(
        `<p>Phonebook has info for ${result.length} people.</p>
       <p>${new Date()}</p>`
      )
    })
    .catch((err) => {
      return next(err)
    })
})

module.exports = router
