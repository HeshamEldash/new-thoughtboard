import React, { useState, useContext } from "react";
import AuthContext from "../ContextManagers/AuthContext";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CreateListArea from "../IList/CreateListArea";



const APIENDPOINT = "https://thought-board-app.herokuapp.com/api"


//  the create thought component takes the user input and sends a post request to the server to create either a note or a list
// it then sends that list or Note to the Dashboard to store in the frontend. The Dashboard then sends it to the Notes Or Lists
export default function CreateThought(props) {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { user, authTokens } = useContext(AuthContext);
  const [input, setInput] = useState({ title: "", content: "" });
  const [toDoListItems, setToDoListItems] = useState([]);
  const [inputIsList, setInputIsList] = useState(false);  // change back to false

  let changeToList = () => {
    setInputIsList((prev) => !prev);
  };


  let getIListItems = (iListItems) => {
    setToDoListItems(iListItems);
    
  };


  let createList = async (e) => {
    e.preventDefault();



    let newList = {
      title: input.title,
      items: toDoListItems.map((item) => {
        return item.value;
      }),
      category: "home",
      date_created: "",
      user: user.user_id,
      parent_api_category: 1,
    };

    let newListToAdd = {
      title: input.title,
      items: toDoListItems.map((item) => {
        return {item:item.value};
      }),
      category: "home",
      date_created: "",
      user: user.user_id,
      parent_api_category: 1,
    };


    let response = await fetch(
      `${APIENDPOINT}/lists/${user.user_id}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(newListToAdd),
      }
    );
  



    props.onAddList(newList);

    // reset the create thought area to clear. Not managing to clear the creare list area yet 
    setToDoListItems([])
    setInput({ title: "", content: "" })
  };

  let tryAdd = (list) => {

    console.log(list)
    props.onAddList(list);

  }

  let createNote = async (e) => {
    e.preventDefault();

    let newNote = {
      title: input.title,
      content: input.content,
      category: "home",
      date_created: "",
      user: user.user_id,
      parent_api_category: 1,
    };

    let response = await fetch(
      `${APIENDPOINT}/notes/${user.user_id}/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(newNote),
      }
    );

    props.onAdd(newNote);

    setInput({
      title: "",
      content: "",
    });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  return (
    <div id="create-thought-container">
      <div className="creat-thought-inner-container">
        <FormControlLabel
          value="end"
          control={
            <Switch
              {...label}
              size="small"
              checked={inputIsList}
              onChange={changeToList}
            />
          }
          label="List"
          labelPlacement="end"
        />
        {inputIsList ? (
          <>

            <div className="list-item-container">
              <CreateListArea getIListItems={getIListItems} onAddList = {tryAdd}/>
            </div>
          </>
        ) : (
          <form>
            <input
              className="create-input-area"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={input.title}
            />
            <textarea
              className="create-input-area"
              name="content"
              placeholder="Take a note..."
              rows="3"
              onChange={handleChange}
              value={input.content}
            />
          </form>
        )}
        <>
          <button
            type="submit"
            onClick={inputIsList ? createList : createNote}
            className="add-thought-button"
          >
            Add
          </button>
        </>
      </div>
    </div>
  );
}
