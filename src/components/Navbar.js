import React from 'react'

const Navbar = () => {
return (
<div className="Navbar wrapper">
  <nav className="navbar navbar-dark bg-dark">
    <button className="btn btn-secondary" 
        type="button" 
        data-toggle="collapse" 
        data-target="#sideMenu"  
        aria-expanded="false" >
      <span className="navbar-toggler-icon"></span>
    </button>
    <form className="search-bar" action="" method="get" role="search">              {/*LLEVAR A UN COMPONENTE ESPECIFICO*/}
      <div className="d-flex"> 
        <input className="form-control" type="text" placeholder="Search..." />
        <button className="search-button" type="submit" value=""><i className="fa fa-search"></i></button>
      </div>
    </form>
  </nav>
</div>
)}

export default Navbar