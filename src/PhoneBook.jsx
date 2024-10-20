import { useState } from 'react'

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
      <div>
        <p>filter shown with <input value={filter} onChange={handleFilter} /></p>
      </div>
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
            {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
           
            {/* {persons.map(person => {     const filterPersons = persons.filter(person => person.name.toLowerCase.filter(fil.toLowerCase))
                <li key={person.name}>{person.name} {person.number}</li>
            } )} */
            
            //let f = persons.filter(person => person.name.includes(filter))

            
            }
        </ul>
    </div>
  )
}

export default PhoneBook