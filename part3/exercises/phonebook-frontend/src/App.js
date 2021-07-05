import {useState, useRef, useEffect} from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Person from './components/Person'

import personService from './services/persons'

function App() {

  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState([]);
  const filterInput = useRef(null);
  const nameInput = useRef();
  const phoneInput = useRef();

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      console.log(initialPersons)
      setPersons(initialPersons)
      setPersonsToShow(initialPersons)
    });
  }, [])


  const addPerson = (event) => {
    console.log(event)
    event.preventDefault();
    const nameInputValue = nameInput.current.value;
    const phoneInputValue = phoneInput.current.value;
    if (nameInputValue === '' || phoneInputValue === '') return;
    //if (persons.filter(person => person.name === nameInputValue).length > 0) return;

    const newPerson = {
      //id: persons.length + 1,
      name: nameInputValue,
      number: phoneInputValue,
    }

    const personAlreadyExists = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase());
    if (personAlreadyExists) {
      if (window.confirm('Dude already in list, update number?')) {
        const person = {
          id: persons.filter(p => p.name.toLowerCase() === newPerson.name.toLowerCase())[0].id,
          name: nameInputValue,
          number: phoneInputValue
        }
        personService.update(person.id, person).then(updatedPerson => {
          setPersons(persons.map(per => per.id !== person.id ? per : updatedPerson)) 
          setPersonsToShow(persons.map(per => per.id !== person.id ? per : updatedPerson))
        }

        )
      }
    } else {
        personService.create(newPerson).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setPersonsToShow(persons.concat(returnedPerson))
        })
    }

    nameInput.current.value = null;
    phoneInput.current.value = null;
  }

   const deletePerson = (id) => {
     if (window.confirm('Delete?')) {
      personService.remove(id);
      setPersons(persons.filter(p => p.id !== id))
      setPersonsToShow(persons.filter(p => p.id !== id))
      filterInput.current.value = null;
     }
   }

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    const show = value === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(value))
    setPersonsToShow(show)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterRef={filterInput} handleChange={handleFilterChange} />
      <h2>Add Persons</h2>
      <PersonForm nameRef={nameInput} phoneRef={phoneInput} handleSubmit={addPerson} />
      <h2>Numbers</h2>
      {/*<Persons persons={personsToShow} />*/}
      <ul>
        <>
        {personsToShow.map(person => 
            <Person key={person.id} person={person} deletePerson={deletePerson} />
          )}          
          </>
      </ul>
    </div>
  );
}

export default App;
