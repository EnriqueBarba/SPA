import React from 'react'

const Navbar = () => {
return (
<div className="Navbar">
  <nav className="navbar navbar-dark bg-dark">
    <button className="btn btn-info" 
        type="button" 
        data-toggle="collapse" 
        data-target="#sideMenu"  
        aria-expanded="false" >
      <span className="navbar-toggler-icon"></span>
    </button>
  </nav>
</div>
)}

export default Navbar