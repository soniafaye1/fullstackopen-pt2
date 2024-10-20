import { useState } from 'react'

const Persons = ({persons, filter}) => (
    <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
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
        number: newNumber
    }
    //map over person names, if newName idx = -1  means person is not in array -> add new person 
    if(persons.map((person) => person.name).indexOf(newName) === -1){
        setPersons(persons.concat(newPerson))
    }else{
        window.alert("person exists")
    }
    setNewName('') 
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>

      <h3>add a new </h3>
      <PersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}handleNewContact={handleNewContact} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default PhoneBook