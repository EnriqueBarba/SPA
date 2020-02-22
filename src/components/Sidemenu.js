import React from 'react'
import { WithAuthConsumer } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Sidemenu = ({currentUser}) => (
    <div className="Sidemenu collapse bg-dark p-2" id="sideMenu">
        <div className="bg-dark p-2 ">
        {!currentUser && 
            <h4>
                <Link className='login-link' to="/login"> Log In </Link>
            </h4>
        }
        {currentUser && 
            <span className="text-muted"><Link to="/logout">Log Out</Link></span>
        }
        </div>
    </div>
)

export default WithAuthConsumer(Sidemenu)