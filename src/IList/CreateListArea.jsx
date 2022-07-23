import React, { useContext, useEffect, useState } from "react";
import IListItem from "./IListItem";
import AuthContext from "../ContextManagers/AuthContext";
import Checkbox from "@mui/material/Checkbox";

const APIENDPOINT = "https://thought-board-app.herokuapp.com/api"


export default function CreateListArea(props) {
  const { user, authTokens } = useContext(AuthContext);
  const [fields, setFields] = useState(["item0"]);
  const [values, setValues] = useState({});
  const [title, setTitle] = useState("");
  const [clearInput, setClearInput]= useState(false)

  



  const handleItemChange = (itemId, value) => {
    setValues({ ...values, [itemId]: value });
    let lastElement = fields[fields.length - 1];

    if (itemId === lastElement) {
      let lastField = `item${fields.indexOf(lastElement) + 1}`;
      setFields((prev) => [...prev, lastField]);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setTitle(value);
  }


  let items = Object.keys(values).map(function (key) {
    return values[key];
  });



  let addList = async (e) => {
    let newList = {
      title: title,
      items: items,
      category: "home",
      date_created: "",
      user: user.user_id,
      parent_api_category: 1,
    };

    let newListToAdd = {
      title: title,
      items: items.map((item) => {
        return { item: item };
      }),
      category: "home",
      date_created: "",
      user: user.user_id,
      parent_api_category: 1,
    };

    props.onAddList(newList);

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

    setTitle("");
    setValues({});
    setFields(["item0"]);
    setClearInput(!clearInput)
  };


  return (
    <>  
           <>
          <input
            className="creat-list-title"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={title}
          />

          {fields.map((item) => (

            <div className="list-item">
            <Checkbox/>
            <IListItem
              key={item}
              id={item}
              onChange={handleItemChange}
              value={values[item]}
              clear= {clearInput}
            />
            </div>


          ))}


          <button
            onClick={addList}
            style={{ zIndex: "100" }}
            className="add-thought-button"
          >
            Add
          </button>
        </>


    </>
  );
}
