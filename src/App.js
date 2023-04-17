import React from 'react'
import TheNotes from './comps/TheNotes.js'
import {nanoid} from 'nanoid'
function App() {
const [notes, setNotes] = React.useState(
   () => JSON.parse(localStorage.getItem('notes')) || [] )
const [editMode, setEditMode] = React.useState(false)
const [inputValue, setInputValue] = React.useState('')
const [editValue, setEditValue] = React.useState('')



React.useEffect(() =>{
  localStorage.setItem('notes', JSON.stringify(notes))


  
},[notes])

function handleInput(event){
  const value = event.target.value
  setInputValue(value)
}


function handleeInput(event){
  const value = event.target.value
  setEditValue(value)
}
function createNotes(event){
  event.preventDefault()
  if(inputValue === "") {
    return;
  }
  const notor = {
      content: inputValue,
      id: nanoid(),
  }
    notes.unshift(notor)
    localStorage.setItem('notes', JSON.stringify(notes))
    setInputValue('');
    const newNoteElement = document.querySelectorAll('all-notes');
    newNoteElement.className = 'notes-div fade-in';

}
function editNote(event, id){
  event.stopPropagation();
   const targetNote = notes.find(note => note.id === id)
        if(targetNote){
          setEditValue(targetNote.content)
            setEditMode(true)
        } 
  deleteNote(event,id)
}
function saveChanges(e){
  e.preventDefault();
    const notor = {
      content: editValue,
      id: nanoid(),
      on: false,
    }
    notes.unshift(notor)
    setEditMode(false);
    localStorage.setItem('notes', JSON.stringify(notes));
}
function deleteNote(event, noteId){
   event.stopPropagation();
   setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
   localStorage.setItem('notes', JSON.stringify(notes.filter(note => note.id !== noteId)))
}

 function toggleChecked(event, id){
  event.stopPropagation()
   setNotes(prevNotes => {
    const newNotes = []
    for(let i = 0; i < prevNotes.length; i ++){
      const currentNote = prevNotes[i]
      if (currentNote.id === id){
        const updatedNotes = {
          ...currentNote, 
          on: !currentNote.on
        }
        newNotes.push(updatedNotes)
        }else {
          newNotes.push(currentNote)
      }
  }
    return newNotes
   } )
 }
 function clearAll(){
   localStorage.clear()
  setNotes([])
 }

const notesEle = notes.map((note, index) => (
  <TheNotes
  key={note.id}
  checkedValue={note.on}
  toggleChecked={toggleChecked}
  id={note.id}
  value={note.content}
  edit={editNote}
  checkedVal={note.on}
  index={index}

  />
))
  return (
    <div className="App">
      {editMode ?
       <div className="edit-div">
          <div className="input-div">
            <input type="text" value={editValue} onChange={handleeInput} className="edit-input"/>
            <button className="edit-save" onClick={saveChanges} >Save Change</button>
          </div>
      </div>
        :""}
      <form className="form-div" onSubmit={createNotes} >
        <input
         type="text"
         placeholder="Type your task"
         className="task-input"
         id="content"
         value={inputValue}
         onChange={handleInput}
         />
        <button className="sub-but">Save</button>
        
 
    </form>
    <button className="delete-all" onClick={clearAll}>Delete All Notes</button>
      <div className="all-notes">
         {notesEle}
         </div>
    </div>
  );
}

export default App;
