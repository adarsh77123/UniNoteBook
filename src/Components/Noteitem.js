import React, { useContext } from 'react';
import NoteContext from '../Context/notes/NoteContext';

export default function Noteitem(props) {
  const context = useContext(NoteContext);
  const {  deleteNote } = context;
  const { note,updateNote } = props;

  return (
    <div className='col-md-3 my-3'>
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Notes</span>
          <div className="d-flex">
            <i className="bi bi-pencil-fill ms-2" onClick={()=>{updateNote(note)}}></i>
            <i className="bi bi-trash3-fill ms-2" onClick={() => { deleteNote(note._id); }}></i>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">Title: {note.title}</h5>
          <p className="card-text">Description: {note.description}</p>
          <p className="card-text">Tag: {note.tag}</p>
          
        </div>
      </div>
    </div>
  );
}
