import React from 'react'
import SearchBar from './SearchBar'

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
        <SearchBar />
      </nav>
    </div>
  )
}

export default Navbar