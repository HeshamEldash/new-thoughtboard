import React, { useContext, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";

const IListItem = ({ value, onChange, id, onDisplay, checked }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    event.stopPropagation();
    const text = event.target.value;
    onChange(id, text);
  };

  let checkedStyle = {textDecoration:"line-through", opacity:"0.7"}
  return (
    <>
      {onDisplay ? (
        <div className="listItem-content-onDisplay"   
           style={checked ? checkedStyle:{}}
        >{value.item}</div>
      ) : (
        <>
          <input
            className="list-item-field"
            onChange={handleChange}
            value={typeof value == "undefined" ? inputValue : value.item}
            style={checked ? checkedStyle:{}}
          />
        </>
      )}
    </>
  );
};

export default IListItem;
