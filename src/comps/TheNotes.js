import React from 'react'

export default function TheNotes(props) {
  const notesDivRef = React.useRef(null)
  const [isChecked, setIsChecked] = React.useState(false);

  function handleCheckboxChange(event) {
    event.stopPropagation();
    
    setIsChecked(!isChecked);
  };
 React.useEffect(() => {
    const notesDiv = notesDivRef.current
   const animationDelay = `${props.index * 0.1}s`
    
    notesDiv.style.transform = 'translateX(0)'
    notesDiv.style.opacity = 1
    notesDiv.style.animation = 'fadein 2s'
    notesDiv.style.animationFillMode = 'forwards'
    notesDiv.style.animationDelay = animationDelay

  }, [props.index])
;

  return (

    <div className={`
            notes-div ${props.checkedValue ?
            "isChecked":
            "isUnChecked"}
            `
           } id={props.id}
           ref={notesDivRef} >
      <label htmlFor={props.id} className="labelDiv">
        <input type="checkbox"
         id={props.id}
         onClick={
          (event) => props.toggleChecked(event,props.id) && handleCheckboxChange(event)}
          defaultChecked={props.checkedValue}
          className="checkers"
          onChange={handleCheckboxChange}
          />
      </label>
        <div className={"the-note"}><p className="note-text">{props.value}</p></div>
        <div className="option-div">
          <div className="edit-butt" onClick={(event) => props.edit(event, props.id)}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" className="edit-button" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M14,4 L20,10 L14,4 Z M22.2942268,5.29422684 C22.6840146,5.68401459 22.6812861,6.3187139 22.2864907,6.71350932 L9,20 L2,22 L4,15 L17.2864907,1.71350932 C17.680551,1.319449 18.3127724,1.31277239 18.7057732,1.70577316 L22.2942268,5.29422684 Z M3,19 L5,21 M7,17 L15,9"></path></svg></div>
        </div>
      </div>
          
  )
}
