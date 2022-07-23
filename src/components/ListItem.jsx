// import React, { useState, useEffect, useMemo } from "react";
// import Checkbox from "@mui/material/Checkbox";
// import { v4 as uuidv4 } from "uuid";
// import AddIcon from "@mui/icons-material/Add";

// function ListItem(props) {
//   const [listItem, setListItem] = useState("");
//   const [added, setAdded] = useState(false);
//   const [listId, setListId] = useState("");

//   let handleListItemChange = (e) => {
//     let value = e.target.value;
//     setListItem(value);
//     // props.update(listItem, listId, added);
//     props.onChange(props.id, value)

//   };
//   useEffect(() => {
//     let id = uuidv4();
//     setListId(id);
//   }, []);

//   let add = () => {
//     setAdded(true);
//     props.onAdd(listItem, listId, added);

//   };

//   useEffect(()=>{
//     setListItem(props.itemValue)
//   },[props.itemValue])


//   return (
//     <div className="list-item-container">
//       <Checkbox/>
//       {props.onDisplay ? (
//         <div role="textbox" contenteditable="false">
//           {props.itemValue}

//         </div>
//       ) : (
//         <>
//           <input
//             className="list-item"
//             name="title"
//             placeholder="List item"
//             value={props.itemValue}
//             onChange={handleListItemChange}
//           />
//           <button className="add-list-button" onClick={add}>
//             <AddIcon fontSize="small" />
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default ListItem;
