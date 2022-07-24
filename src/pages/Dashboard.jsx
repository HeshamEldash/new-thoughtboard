import React, { useState } from "react";
import Notes from "./Notes";
import CreateThought from "../components/CreateThought";
import Lists from "./Lists"


export default function Dashboard() {
  let [newNote, setNewNote] = useState([]);
  let [newList, setNewList] = useState([])
  function addNote(newNote) {
    setNewNote((prev) => newNote);
  }
  function addList(newList){
    setNewList((prev)=> newList)
  }

  return (
    <div id="dashboard">
      <CreateThought onAdd={addNote} onAddList ={addList}/>
      <div id="dashboard-inner-container">
        <Notes  newNote={newNote} />
        <Lists newList={newList}/>
      </div>
    </div>
  );
}
