
import React from "react";

function Note(props) {
  function handleDeleteClick(){
    if(window.confirm("do you want to delete this note?"))
      props.onDelete(props.id);
  }
  function handleCheckboxChange(){
    props.onToggleComplete(props.id);
  }

  return (
    <div className={`note ${props.completed ? "completed" : ""}`}>
      <div className="box">
        <input
          type="checkbox"
          checked={props.completed}
          onChange={handleCheckboxChange}
        />
        <button onClick={handleDeleteClick}><img src={require("./images/deleteIcon.png")} alt="Delete Icon" /></button>
      </div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p><strong>Category:</strong> {props.category}</p>
    </div>
  );
}

export default Note;
