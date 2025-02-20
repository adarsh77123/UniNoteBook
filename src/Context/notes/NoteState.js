import { useState } from "react";
import NoteContext from "./NoteContext.js"; // Ensure the case matches the file name
import { useNavigate } from "react-router-dom";

const NoteState = (props) => {
  const navigate=useNavigate();
  const [notes, setNotes] = useState([]);
  const [alert, setalert] = useState(null);
  

const Showalert = (type,msg ) => {
  setalert({ msg, type });  // Set alert as an object
  
  setTimeout(() => setalert(null), 2000);  // Clear alert after 2 seconds
};

 
   const editNote = async (id, title, description, tag) => {
    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();

    Showalert(json.successMessages[0].type,json.successMessages[0].msg)

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }

   
  };
   setNotes(newNotes);

} 
  // Fetch all notes
  const getNotes = async () => {
    const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });

    const json = await response.json();
   setNotes(json);

  };

  // Add a new note
  const addNote = async (title, description, tag) => {
    const response = await fetch("http://localhost:5000/api/notes/addnotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description , tag })
    });

    const json = await response.json();
    setNotes([...notes, json.note]); 

    Showalert(json.successMessages[0].type,json.successMessages[0].msg)
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response=await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    Showalert(json.successMessages[0].type,json.successMessages[0].msg)
  };
  const Login = async (email,password) => {
  
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
  
  });
    const json = await response.json();
  console.log(json)
  if(json.success){
    localStorage.setItem("token",json.authtoken)
    Showalert(json.type,json.msg)
    navigate("/Home")

    
  }
  else{
    Showalert("warning","invalid credentials")
  }
  
  };
  const SingUp = async (email,password,name) => {
  
    const response = await fetch("http://localhost:5000/api/auth/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password,name})
  
  });
  const json = await response.json();
  console.log(json)
  if(json.success){
    localStorage.setItem("token",json.authtoken)
    Showalert(json.type,json.msg)
    navigate("/LogIn")
  }
  else{
    Showalert("warning","invalid credentials")
  }
  
  };

 
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, alert,Login,SingUp}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
