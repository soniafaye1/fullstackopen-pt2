import { useEffect, useState } from 'react'
import noteService from './services/notes'

const Note = ({note, toggleImportance}) => {
  const label = note.important ? "make not important" : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
        id: String(notes.length + 1),
        content: newNote,
        important: Math.random() < 0.5,
    }
    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
    .update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(n => n.id === id ? returnedNote : n))
    })
    .catch(error => {
      alert(`the note was already deleted`)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(() =>{
    noteService.getAll().then(initialNotes => {setNotes(initialNotes)})
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
           <Note 
           key={note.id}
           note={note}
           toggleImportance={() => toggleImportanceOf(note.id)}
           />)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>add note</button>
      </form>
    </div>
  )
}

export default Notes 