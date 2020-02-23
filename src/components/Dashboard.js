import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from '../ui/Products'
import Login from './Login'
import ProductDetails from '../ui/ProductDetails'
import UserForm from './UserForm'
import { WithAuthConsumer } from '../context/AuthContext'

const Dashboard = ({currentUser}) => {
    return (
        <div className="Dashboard">
            <Switch>
                <Route exact path="/" component={Products}/>
                <Route exact path="/product/:flag" component={ProductDetails}/> 
                {!currentUser && 
                    <>
                        <Route exact path="/login"  component={Login}/> 
                        <Route exact path="/register" component={UserForm}/>
                    </>
                }
                {currentUser && 
                    <>
                        <Route exact path="/profile" component={UserForm}/>
                        <Route exact path="/product/new" />
                        <Route exact path="/product/update" /> 
                        <Route exact path="/confirm/:id" /> 
                    </>
                }
            </Switch>
        </div>
    )
}

export default WithAuthConsumer(Dashboard)