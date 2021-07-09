const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to mongo db')
    }).catch(e => {
        console.log('error connecting to mongo db:', e.message)
    })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    required: true
  }, 
  number: {
    type: String,
    minLength: 1,
    required: true
  }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = mongoose.model('Person', personSchema)

module.exports = Person;