import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../ContextManagers/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from "@mui/material/Backdrop";


// const APIENDPOINT = "https://thought-board-app.herokuapp.com/api"
const APIENDPOINT = "http://127.0.0.1:8000/api"


export default function Note(props) {
  let {authTokens} = useContext(AuthContext);
  let [noteDetails, setNoteDetails] = useState({
    title: props.title,
    content: props.content,
    category: "home",
    date_created: "",
    user: props.user,
    parent_api_category: 1,
  });
  const [open, setOpen] = useState(false);
  const noteInputRef = useRef();

  const handleClose = (e) => {
    setOpen(false);
    updateNote()
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  // sets the autofocus in the note area when clicked
  useEffect(() => {
    if (open) {
      const end = noteInputRef.current.value.length;
      noteInputRef.current.focus();
      noteInputRef.current.setSelectionRange(end, end);
    }
  }, [open]);


  function deleteNote(e) {
    e.stopPropagation()
    props.deleteNote(props.id);
  }

  function handlChange(event) {
    const { name, value } = event.target;
    setNoteDetails((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function updateNote() {
    fetch(`${APIENDPOINT}/note/${props.id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json ; charset=utf-8",
        "Authorization": "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(noteDetails),
    });
  }


  return(
    <div id="">
    {open &&
      <>
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
      <div  class="editable-note"  onClick={(e) => {
                e.stopPropagation();
              }}>
          <input
            role="textbox"
            name="title"
            value={noteDetails.title}
            onChange={handlChange}
            placeholder="Title"
          />
          <textarea
            role="textbox"
            name="content"
            onChange={handlChange}
            value={noteDetails.content}
            placeholder="Take a note..."
            ref={noteInputRef}
          ></textarea>
               <div className="note-footer" >
            <button onClick={deleteNote} className="note-delete-button"> <DeleteIcon/> </button>
        </div>
        </div>
        </Backdrop>
        </>
    }
 
    <div className="thought" onClick={handleToggle} style= {{opacity: open && 0}}>
       <div  className="inner-note" onClick={handlChange} >
          <div className="note-title-container " >
            {noteDetails.title}
  
          </div>
          <div className="note-body-container" style={{opacity: !noteDetails.content && "0.6" }}>{noteDetails.content ?noteDetails.content: "Empty Note...."}</div>
         
        </div>
        <div className="note-footer" >
            <button onClick={deleteNote} className="note-delete-button"> <DeleteIcon/> </button>
        </div>

      </div>
    
    

    </div>
  )

}
