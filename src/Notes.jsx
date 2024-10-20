import { useState } from 'react'

const Notes = ({startingNotes}) => {
  const [notes, setNotes] = useState(startingNotes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
        id: String(notes.length + 1),
        content: newNote,
        important: Math.random() < 0.5,
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => <li key={note.id}>{note.content}</li>)}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>add note</button>
      </form>
    </div>
  )
}

export default Notes 