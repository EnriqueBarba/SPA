import React from 'react'
import { WithAuthConsumer } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Sidemenu = ({currentUser, logout}) => (
    <div className="Sidemenu collapse bg-dark p-2" id="sideMenu">
        <div className="bg-dark p-2 ">
        {!currentUser && 
            <ul>
                <li><Link className='login-link' to="/login"> Log In </Link></li>
                <li><Link className='login-link' to="/register"> Register </Link></li>
            </ul>
        }
        {currentUser && 
            <ul>
                <li><Link className='login-link' to="/profile"> Profile </Link></li>
                <li><Link className='login-link' to="/product/new"> Add Product </Link></li>
                <li className="text-muted" onClick={logout}>Log Out</li>
            </ul>
        }
        </div>
    </div>
)

export default WithAuthConsumer(Sidemenu)