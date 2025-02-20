
import { Link,useLocation } from 'react-router-dom'


export default function Navbar() {
  let location=useLocation();

  return (
    <div className='main-content'>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >

    <div className="container-fluid" >
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/Home"?"active":""} `}aria-current="page" style={{marginTop:"6px"}}  to="/Home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"?"active":""} `} style={{marginTop:"6px"}} to="/about">About</Link>
          </li>
     
     
         
        </ul>

        <div 
  className="d-flex" 
  style={{ 
    alignItems: "center",   
    width: "100%", 
        
    position: "relative"    
  }}
>
  <h1 
    className="text-white" 
    style={{ 
      position: "absolute",  
      left: "31%",           
    }}
  >
    UniNotebook
  </h1>
</div>
<Link type="button"  to="/LogIn" className="btn btn-primary mx-2">LogIn</Link>
<Link   type="button" to="/SignUp" className="btn btn-primary">SignUp</Link>

 
           </div>
    </div>
  </nav>
  </div>
  )
}
