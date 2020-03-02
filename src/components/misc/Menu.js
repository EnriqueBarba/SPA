import React from 'react'
import { WithAuthConsumer } from '../../context/AuthContext'
import { Nav } from 'react-bootstrap'

const Menu = ({currentUser, logout}) => (
        <>
        {!currentUser && <>
            <Nav.Link className='link' href="/login"> Log In </Nav.Link>
            <Nav.Link className='link' href="/register"> Registrarse </Nav.Link>
            </>
        }
        {currentUser && <>
            <Nav.Link className='link' href="/cart"> Mi cesta </Nav.Link>
            <Nav.Link className='link' href="/new/product"> Subir Producto </Nav.Link>
            <Nav.Link className='link' href="/orders"> Mis Pedidos </Nav.Link>
            <Nav.Link className='link' href="/profile"> Perfil </Nav.Link>
            <Nav.Link className="text-muted" onClick={logout}>Log Out </Nav.Link>
            </>
        }
        </>
)

export default WithAuthConsumer(Menu)