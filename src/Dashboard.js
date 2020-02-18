import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className="Dashboard">MAIN CONTENT
        <Switch>
            <Route exact path="/" /> {/* listProducts */}
            <Route exact path="/login"  /> {/*component={LogInForm}*/}
            <Route exact path="/register" /> {/*component={RegisterForm}*/}
        </Switch>
        </div>
    )
}

export default Dashboard