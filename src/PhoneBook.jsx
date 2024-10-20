import { useState } from 'react'

const PhoneBook = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '123-123-1223' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
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
      <h2>Numbers</h2>
        <ul>
            {persons.map(person => <li key={person.name}>{person.name} {person.number}</li> )}
        </ul>
    </div>
  )
}

export default PhoneBook