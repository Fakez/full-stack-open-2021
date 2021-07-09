require('dotenv').config()

const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.static('build'))

app.use(cors())

const Person = require('./models/person')

// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }


//morgan.token('type', function (req, res) { return req.headers['content-type'] })

// app.use(requestLogger)
app.use(
    morgan(function (tokens, req, res) {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'), '-',
          tokens['response-time'](req, res), 'ms',
        ].join(' ')
      })

)


// persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/', (request, response) => {
    response.send('<h1>API</h1>')
})

app.get('/info', (request, response) => {
    const numPeople = persons.length;
    const today = new Date();

    response.send(
        `<p>Phonebook has info for ${numPeople} people</p>` +
        `<p>${today}</p>`
    )
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        console.log(response.json(person))
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end()

    }).catch(error => {
        console.log(error)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        }).catch(error => {
            console.log(error)
    })
})

app.put('/api/persons/:id', (request, response) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })
    console.log(request.params.id)
    console.log(person.name)
    console.log(person.number)
    Person.findByIdAndUpdate(request.params.id, person, { new: true }).then(updatedPerson => {
        response.json(updatedPerson)
    }).catch(error => {
        //console.log(error)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
