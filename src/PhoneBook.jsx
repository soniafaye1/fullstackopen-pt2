import { useEffect, useState } from 'react'
import phoneService from './services/phoneNumbers'
import './index.css'

const Notification = ({messageType, message}) => {
  if(message === null){
    return null;
  }

  return (
    <div className={messageType}>{message}</div>
  )
}

const Persons = ({persons, filter, deleteContact}) => (
    <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
            <li key={person.name}>
                {person.name} {person.number}
                <button onClick={() => deleteContact(person.id, person.name)}>delete</button>
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
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("")

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

    const nameExists = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase())    

    if(nameExists && window.confirm(`are you sure you want to update ${nameExists.name}'s number ?`) ){
      nameExists.number = newNumber;  
      phoneService.update(nameExists.id, nameExists)
        .then(updatedPerson => {
          setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
          setMessage(`Updated ${updatedPerson.name}`)
          setMessageType("success")
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(e => {console.log(e)})

    }else{
        phoneService.create(newPerson).then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${returnedPerson.name}`);
          setMessageType("success")
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(e => {console.log(e)})
    }
    setNewName('') 
    setNewNumber('')
  }

  const deleteContact = (id, name) => {

    phoneService.deletePerson(id)
    .then(setPersons(persons.filter(p => p.id !== id)))
    .catch(e => {
      setMessage(`${name} has already been deleted`)
      setMessageType("error")
      console.log(e)
    })
  }

  useEffect(() => {
    phoneService.getAll().then(allPersons => setPersons(allPersons))
  },[persons])

  if(!persons){
    return null
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageType={messageType} message={message} />

      <Filter filter={filter} handleFilter={handleFilter}/>

      <h3>add a new </h3>
      <PersonForm newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} handleNewContact={handleNewContact} />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deleteContact={deleteContact}/>
    </div>
  )
}

export default PhoneBook