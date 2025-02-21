import NoteContext from "../Context/notes/NoteContext";
import Noteitem from './Noteitem';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let navigate=useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem("token")){
          getNotes();
    }
    else{
       navigate("/LogIn")
    }
    // eslint-disable-next-line
  }, []);

  const refClose = useRef(null);
  const ref = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const handleClick = async () => {
    await editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  disabled={note.etitle.length>=3 &&note.edescription.length>=5  ?false:true} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'style={{marginLeft:"15px"}}>
       { notes.length===0 ?"You have no notes" :notes.map((note) => {
          return <Noteitem key={note._id} note={note} updateNote={updateNote} />;
        })}

      </div>
    </div>
  );
}
