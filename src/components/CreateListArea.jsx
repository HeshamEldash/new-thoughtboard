import React, { useState, useRef, useEffect } from "react";
import ListItem from "./ListItem";

function CreateListArea(props) {
  const [listItems, setListItems] = useState([]);

  const addToList = (item, id, added) => {
    if (listItems.length === 0) {
      setListItems((prev) => {
        return [...prev, { value: item, id: id }];
      });
    } else {
      if (added) {
        const newState = listItems.map((obj) => {
          if (obj.id === id) {
            return { ...obj, value: item };
          }
          return obj;
        });

        setListItems(newState);
      } else {
        setListItems((prev) => {
          return [...prev, { value: item, id: id }];
        });
      }
    }
  };

  

  useEffect(()=>{props.getListItems(listItems)}, [listItems])

  return (
    <>
      <ListItem onAdd={addToList} />
      {listItems.map((item) => (
        <ListItem key={item.id} onAdd={addToList} />
      ))}
    </>
  );
}

export default CreateListArea;
