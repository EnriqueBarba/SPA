import React from 'react'
import SearchBar from '../Search/SearchBar'
import { Navbar } from 'react-bootstrap'
import Menu from './Menu'


const MyNavbar = ({currentUser, logout}) => {
  return (
    <>
    <Navbar className="MyNavBar" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <SearchBar />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Menu />
        </Navbar.Collapse>
    </Navbar>
    </>
)
  /*
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
  */

}

export default MyNavbar