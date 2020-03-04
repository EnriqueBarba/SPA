import React from 'react'
import SearchBar from '../Search/SearchBar'
import { Navbar } from 'react-bootstrap'
import Menu from './Menu'


const MyNavbar = ({currentUser, logout}) => {
  return (
    <>
    <Navbar className="MyNavBar" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">ICON</Navbar.Brand>
      <SearchBar />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Menu />
        </Navbar.Collapse>
    </Navbar>
    </>
)
}

export default MyNavbar