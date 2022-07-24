import React, { useContext, useEffect, useState } from "react";
import IListItem from "./IListItem";
import AuthContext from "../ContextManagers/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Backdrop from "@mui/material/Backdrop";
import ClearIcon from "@mui/icons-material/Clear";

// const APIENDPOINT = "https://thought-board-app.herokuapp.com/api"
const APIENDPOINT = "http://127.0.0.1:8000/api"



export default function IList(props) {
  const { user, authTokens } = useContext(AuthContext);
  const [listDetails, setListDetails] = useState({
    items: props.items
      ? props.items.map((listItemContent) => {
          return listItemContent;
        })
      : {},
    title: props.title,
    category: "Tetsin",
    date_created: "",
    user: props.user,
    parent_api_category: 1,
  });

  const [open, setOpen] = useState(false);

  const handleClose = (e) => {
    setOpen(false);
    updateList();
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const removeLastEmptyElement = () => {
    let lastElement = listDetails.items[listDetails.items.length - 1];

    if (lastElement.item === ""){
      setListDetails((prevList) => {
        return {
          ...prevList,
          items: prevList.items.filter((item, index, array) => {
            return index < array.length - 1;
          }),
        };
      });
    }
  };

  const handleItemChange = (itemId, value) => {
    setListDetails((prevList) => {
      return {
        ...prevList,
        items: prevList.items.map((obj) =>
          obj.id === itemId ? Object.assign(obj, { item: value }) : obj
        ),
      };
    });

    let lastElement = listDetails.items[listDetails.items.length - 1];

    if (itemId === lastElement.id) {
      let lastField = itemId + 1;
      setListDetails((prevList) => {
        return {
          ...prevList,
          items: [...prevList.items, { id: lastField, item: "" }],
        };
      });
    }
  };

  function deleteList(e) {
    e.stopPropagation();

    props.deleteList(props.id);
  }

  let updateList = async (e) => {
    
    removeLastEmptyElement()

    let updatedList = {
      title: listDetails.title,
      items: listDetails.items,
      category: listDetails.category,
      date_created: "",
      user: listDetails.user,
      parent_api_category: listDetails.parent_api_category,
    };

    // console.log(JSON.stringify(updatedList))

    let response = await fetch(`${APIENDPOINT}/list/${props.id}/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(updatedList),
    });
  };

  const changeTitle = (e) => {
    let newTitle = e.target.value;
    setListDetails((prevList) => {
      return {
        ...prevList,
        title: newTitle,
      };
    });
  };

  const deleteListItem = (id) => {
    setListDetails((prevList) => {
      return {
        ...prevList,
        items: prevList.items.filter((item, index, array) => {
          return item.id != id;
        }),
      };
    });
  };
  
  const checkItem = (id)=>{
    setListDetails((prevList) => {
    
      return {...prevList, items: prevList.items.map((item)=>{
       
        if (item.id === id){
          return {...item, checked:!item.checked}
        }else{
          return item
        }
      })}
    });
  }

  // useEffect(()=>{
  //   updateList()
  // },[checkItem])

  return (
    <>
      {open ? (
        <>
          <div className="note" style={{ opacity: 0 }}></div>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <div
              className="editable-list"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <>
                <div className="thought-title">
                  <input
                    className="creat-list-title"
                    placeholder="title"
                    value={listDetails.title}
                    onChange={changeTitle}
                    style={{backgroundColor:"inherit", marginBottom:"15px"}}
                  />
                </div>

                {listDetails.items ?
                  
                  listDetails.items.map((item) => (
                    <div className="">
                      <Checkbox
                       checked={item.checked}
                        onClick={(e) => {
                          e.stopPropagation();
                          checkItem(item.id)
                        }}
                      />
                      <IListItem
                        className="edi"
                        key={item.id}
                        id={item.id}
                        value={item}
                        onDisplay={false}
                        onChange={handleItemChange}
                        checked={item.checked}
                      />
                      <ClearIcon
                        style={{ fontSize: "medium", opacity: "0.8" }}
                        onClick={() => {
                          deleteListItem(item.id);
                        }}
                      />
                    </div>
                  ))
                  :
               
                   "hello worel"    

              
                  }
                  <div className="thought-footer">
              <button onClick={deleteList} className="note-delete-button">
                {" "}
                <DeleteIcon />{" "}
              </button>
            </div>

               
              </>
            </div>
          </Backdrop>
        </>
      ) : (
        <>
          <div className="thought" onClick={handleToggle}>
            <div className="thought-title">
              <span>{listDetails.title}</span>
            </div>
            {props.items &&
              listDetails.items.map((item) => (
                <div className="list-item displayed-item">
                  <Checkbox
                    onClick={(e) => {
                      e.stopPropagation();
                      checkItem(item.id)
                    }}
                    checked={item.checked}
                  />
                  <IListItem
                    key={item.id}
                    id={item.id}
                    value={item}
                    onDisplay={true}
                    onChange={handleItemChange}
                    checked={item.checked}
                  />
                 
                </div>
              ))}

            <div className="thought-footer">
              <button onClick={deleteList} className="note-delete-button">
                {" "}
                <DeleteIcon />{" "}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
