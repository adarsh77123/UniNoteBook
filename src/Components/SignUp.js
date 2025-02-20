import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from "../Context/notes/NoteContext";

export default function SignUp() {
  const context = useContext(NoteContext);
  const {SingUp}=context;

  const[creds,setcreds]=useState({email:"",password:"",name:""})
  let navigate=useNavigate();


const handlesubmit=(e)=>{
  e.preventDefault();
  SingUp(creds.email,creds.password,creds.name);
  navigate("/Home")
}
const onChange = (e) => {
  setcreds({ ...creds, [e.target.name]: e.target.value });
};
  return (
    <div>
      <form onSubmit={handlesubmit}>
  <div className="mb-3" style={{marginTop:"90px"}}>
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1"value={creds.email} name="email" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"name="password" value={creds.password} id="exampleInputPassword1" onChange={onChange}/>
  </div>
  <div className="mb-3">
          <label htmlFor="title" className="form-label">Name</label>
          <input type="text" className="form-control" id="title" name="name" value={creds.name} onChange={onChange} required />
        </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}
