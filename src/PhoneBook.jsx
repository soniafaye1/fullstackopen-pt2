import { useEffect, useState } from 'react'
import phoneService from './services/phoneNumbers'

const Persons = ({persons, filter, deleteContact}) => (
    <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
            <li key={person.name}>
                {person.name} {person.number}
                <button onClick={() => deleteContact(person.id)}>delete</button>
            </li>
        )}
    </ul>
)


const PersonForm = ({newName, handleNewName, newNumber, handleNewNumber, handleNewContact}) => {
    return(
        <form onSubmit={handleNewContact}>
            <div>
                name: <input value={newName} onChange={handleNewName} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNewNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Filter = ({ filter, handleFilter}) => (
    <div>
        <p>filter shown with <input value={filter} onChange={handleFilter} /></p>
    </div>
)

const PhoneBook = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
      ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const fil = event.target.value;
    setFilter(fil)
  }

  const handleNewContact = (event) => {
    event.preventDefault()
    const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
    }

    let nameExists = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase())
    nameExists.number = newNumber;

    console.log("existing name: ", nameExists)

    if(nameExists && window.confirm(`are you sure you want to update ${nameExists.name}'s number ?`) ){
        phoneService.update(nameExists.id, nameExists).then(updatedPerson => {console.log("uP: ", updatedPerson); setPersons(persons.map(p => p.id === nameExists.id ? updatedPerson : p))}).catch(e => console.log(e))

    }else{
        phoneService.create(newPerson).then(returnedPerson => {setPersons(persons.concat(returnedPerson))})

    }

    setNewName('') 
    setNewNumber('')
  }

  const deleteContact = (id) => {
    phoneService.deletePerson(id).then(setPersons(persons.filter(p => p.id !== id)))
  }

  useEffect(() => {
    phoneService.getAll().then(allPersons => setPersons(allPersons))
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>

      <h3>add a new </h3>
      <PersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}handleNewContact={handleNewContact} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteContact={deleteContact}/>
    </div>
  )
}

export default PhoneBook