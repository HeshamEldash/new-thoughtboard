import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import Note from "../components/Note";
import AuthContext from "../ContextManagers/AuthContext";

// const APIENDPOINT = "https://thought-board-app.herokuapp.com/api"
const APIENDPOINT = "http://127.0.0.1:8000/api"



function Notes(props) {
  let [notes, setNotes] = useState([]);
  let { user, authTokens} = useContext(AuthContext);

  useEffect(() => {
    setNotes((prevNotes) => {
      return [...prevNotes, props.newNote];
    });
    getNotes();
  }, [props.newNote]);

  useEffect(() => {
    getNotes();
  }, []);


  let getNotes = async () => {

    let response = await fetch(`${APIENDPOINT}/notes/${user.user_id}/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + String(authTokens.access), 
      },
    });
    let data = await response.json();

    setNotes(data);
  };

  let deleteNote = async (id) => {
    if (id === undefined) {
      console.log("unsddfrewf");
    } else {
      await fetch(`${APIENDPOINT}/note/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + String(authTokens.access),
        },
      })
      // .then((response) => {
      //   if (response.status >= 400) {
      //     getNotes();
      //   }
      // });
    }

    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
  };

  return (
    <>
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          category={note.category}
          content={note.content}
          deleteNote={deleteNote}
          user={note.user}
        />
      ))}
    </>
  );
}

export default Notes;
