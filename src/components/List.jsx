import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../ContextManagers/AuthContext";
import ListItem from "./ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import { SliderValueLabelUnstyled } from "@mui/base";

export default function List(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  let { authTokens } = useContext(AuthContext);
  let [clicked, setClicked] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [testItems, setTestItems] = useState([])
  const [listDetails, setListDetails] = useState({
    title: props.title,
    category: "Tetsin",
    date_created: "",
    user: props.user,
    parent_api_category: 1,
  });

  function deleteList() {
    props.deleteList(props.id);
  }

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

  const updateList = () => {

    setOpen(!open);
  };


  const handlFieldChange = (fieldId, value)=>{
    setTestItems({...testItems, [fieldId]: value})
  }
  const update = ()=>{
   
  
  }

  useEffect(() => {
    setListItems(props.items);
  }, [props.items]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      ></Backdrop>

      {open &&
        <div style={{width:400, height:300, backgroundColor:"red", zIndex:1203, position:"absolute", margin:"auto" , borderRadius:7}}>
        <h3>{listDetails.title}</h3>
        {listItems
          ? listItems.map((item) => (
              <ListItem
                id = {item}
                key={item}
                onAdd={addToList}
                itemValue={testItems[item]}
                onDisplay={false}
                onChange = {handlFieldChange}
                update = {update}
              />
            ))
          : ""}

        </div>
      
      }

      <div className="note" onClick={updateList} style= {{opacity:open && 0}}>
        <h3>{listDetails.title}</h3>
        {listItems
          ? listItems.map((item) => (
              <ListItem
                key={item.id}
                onAdd={addToList}
                itemValue={item.item}
                onDisplay={true}
              />
            ))
          : ""}

        <div className="note-footer">
          <button onClick={deleteList} className="note-delete-button">
            {" "}
            <DeleteIcon />{" "}
          </button>
        </div>
      </div>
    </>
  );
}
