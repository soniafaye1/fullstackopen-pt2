import { useState } from 'react'

const PhoneBook = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [nameExists, setNameExists] = useState(true)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    const newPerson = {
        name: newName
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const existsAlready = nameExists ? persons.filter(person => persons.includes(person.name)) : newName;

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        {!existsAlready ? alert(`${newName} already exists`) : "" }
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
            {persons.map(person => <li key={person.name}>{person.name}</li> )}
        </ul>
    </div>
  )
}

export default PhoneBook