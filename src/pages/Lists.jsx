import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../ContextManagers/AuthContext";
import IList from "../IList/IList";
import Cookies from 'js-cookie';

// const APIENDPOINT = "https://thought-board-app.herokuapp.com/api"
const APIENDPOINT = "http://127.0.0.1:8000/api"



export default function Lists(props) {
  const [lists, setLists] = useState([]);
  const { user, authTokens } = useContext(AuthContext);

  const [ILists, setILists] = useState([]);

  // change the state of the lists if any new lists are added and sends a get request to the server
  useEffect(() => {
    setLists((prevLists) => {
      return [...prevLists, props.newList];
    });
    getLists();
  }, [props.newList]);

  useEffect(() => {
    setILists((prevLists) => {
      return [...prevLists, props.newList];
    });
    getLists();
  }, [props.newList]);

  // calls the getLists on render
  useEffect(() => {
    getLists();
  }, []);

  // sends a get request to the server to get all the list data
  // set the state of the lists to the resutls of the data
  let getLists = async () => {
    let response = await fetch(
      `${APIENDPOINT}/lists/${user.user_id}/`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
          
        },
      }
    );

    let data = await response.json();

    setILists(data);
  };

  let deleteList = async (id) => {
    if (id === undefined) {
    } else {
      await fetch(`${APIENDPOINT}/list/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
          'X-CSRFToken':Cookies.get("csrftoken"),
        },
      })
      // .then((response) => {
      //   if (response.status >= 400) {
      //     getLists();
      //     console.log("respoonce")
      //   }
      // });
    }
    // removes the deleted note from the displayed lists
    setILists((prevLists) => {
      return prevLists.filter((listItem) => {
        return listItem.id !== id;
      });
    });
  };

  return (
    <>
      {ILists.map((list) => (
        
          <IList
            key={list.id}
            id={list.id}
            title={list.title}
            category={list.category}
            items={list.items}
            deleteList={deleteList}
            user={list.user}
            onDisplay={true}
          />
   
      ))}
    </>
  );
}
