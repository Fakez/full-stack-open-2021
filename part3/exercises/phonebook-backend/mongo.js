const mongoose = require('mongoose')

// if (process.argv.length < 5) {
//   console.log('Please provide all arguments: node mongo.js <password> <name> <number>')
//   process.exit(1)
// }

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const database = 'phonebook'

const url = `mongodb+srv://fullstack:${password}@cluster0.pm4py.mongodb.net/${database}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = mongoose.model('Person', personSchema)


if (password && !number && database) {
    Person.find({}).then(result => {
        result.forEach(person => {
            if (person.name) {
                    console.log(person)
                    //console.log(`${person.name} ${person.number}`)
            }
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to ${database}`)
        mongoose.connection.close()
    })
}