import { useState } from 'react'

const PhoneBook = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    console.log("name: ", persons.map(person => person.name))
    
    const newPerson = {
        name: newName
    }
    //map over person names, if newName idx = -1  means person is not in array -> add new person 
    if(persons.map((person) => person.name).indexOf(newName) === -1){
        setPersons(persons.concat(newPerson))
    }else{
        window.alert("person exists")
    }
    setNewName('') 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
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