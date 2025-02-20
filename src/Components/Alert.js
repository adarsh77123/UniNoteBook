import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";

export default function Alert() {
  const context = useContext(NoteContext);
  const { alert } = context;

  return (
    alert && (
      <div
        className={`alert alert-${alert.type} `}
        style={{
          position: "fixed",
          top: "60px",
          width: "100%",
          textAlign: "center",
          padding: "5px", 
         
        }}
        role="alert"
      >
        {alert.msg}
      </div>
    )
  );
}
