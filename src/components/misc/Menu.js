import React from 'react'
import { WithAuthConsumer } from '../../context/AuthContext'
import { Nav } from 'react-bootstrap'

const Menu = ({currentUser, logout}) => (
        <>
        {!currentUser && <>
            <Nav.Link className='link' href="/login"> Log In </Nav.Link>
            <Nav.Link className='link' href="/register"> Register </Nav.Link>
            </>
        }
        {currentUser && <>
            <Nav.Link className='link' href="/cart"> My Cart </Nav.Link>
            <Nav.Link className='link' href="/new/product"> Add Product </Nav.Link>
            <Nav.Link className='link' href="/orders"> Orders </Nav.Link>
            <Nav.Link className='link' href="/profile"> Profile </Nav.Link>
            <Nav.Link className="text-muted" onClick={logout}>Log Out </Nav.Link>
            </>
        }
        </>
)

export default WithAuthConsumer(Menu)