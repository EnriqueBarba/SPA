import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from './ui/Products'

const Dashboard = () => {
    return (
        <div className="Dashboard">MAIN CONTENT
        <Switch>
            <Route exact path="/" component={Products}/> {/* listProducts */}
            <Route exact path="/login"  /> {/*component={LogInForm}*/}
            <Route exact path="/register" /> {/*component={RegisterForm}*/}
        </Switch>
        </div>
    )
}

export default Dashboard