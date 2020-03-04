import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from '../ui/Products'
import Login from './Login'
import ProductDetails from '../ui/ProductDetails'
import UserForm from './UserForm'
import { WithAuthConsumer } from '../context/AuthContext'
import ProductForm from './Product/ProductForm'
import Cart from './Cart'
import Orders from '../ui/Orders'
import PrivateRoute  from './misc/PrivateRoute '

const Dashboard = ({currentUser}) => {

    //TODO render en funcion del usuario o redirect
    return (
        <div className="Dashboard container">
            <Switch>
                <Route exact path="/" component={Products}/>
                <Route exact path="/products/:cat" component={Products}/>  
                <Route exact path="/products/search/:search" component={Products}/>  
                <Route exact path="/product/details/:flag" component={ProductDetails}/>

                <PrivateRoute exact path="/login"  component={Login} currentUser={!currentUser}/> 
                <PrivateRoute exact path="/register" component={UserForm} currentUser={!currentUser}/>

                <PrivateRoute path="/profile" component={UserForm} currentUser={currentUser}/>
                <PrivateRoute path="/new/product" component={ProductForm} currentUser={currentUser}/>
                <PrivateRoute path="/update/product/:flag" component={ProductForm} currentUser={currentUser}/> 
                <PrivateRoute path="/cart" component={Cart} currentUser={currentUser}/> 
                <PrivateRoute path="/orders" component={Orders} currentUser={currentUser}/>
            </Switch>
        </div>
    )
}

export default WithAuthConsumer(Dashboard)