require('dotenv').config()

const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.static('build'))

app.use(cors())

const Person = require('models/persons')

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

persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(400).json({
            error: 'no person found'
        })
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const persons  = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const personAlreadyExists = persons.find(p => p.name.toLowerCase() === body.name.toLowerCase())
    if (!body.name || !body.number || personAlreadyExists) {
        return response.status(400).json({
            error: 'name or number mising, or name most be unique'
        })
    }

    const maxId = persons.length > 0 ? 
    Math.max(...persons.map(person => person.id))
    : 0

    const person = {
        name: body.name,
        number: body.number,
        id: maxId + 1
    }

    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
