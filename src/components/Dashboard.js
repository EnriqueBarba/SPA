import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from '../ui/Products'
import Login from './Login'
import ProductDetails from '../ui/ProductDetails'
import UserForm from './UserForm'
import ProductForm from './Product/ProductForm'
import Cart from './Cart'
import Orders from '../ui/Orders'
import PrivateRoute  from './misc/PrivateRoute '
import NonLoggedRoute from './misc/NonLoggedRoute'

const Dashboard = ({currentUser}) => {

    //TODO render en funcion del usuario o redirect
    return (
        <div className="Dashboard container">
            <Switch>
                <Route exact path="/" component={Products}/>
                <Route exact path="/products/:cat" component={Products}/>  
                <Route exact path="/products/search/:search" component={Products}/>  
                <Route exact path="/product/details/:flag" component={ProductDetails}/>
        
                <NonLoggedRoute exact path="/login" >
                    <Login />
                </NonLoggedRoute> 
                <NonLoggedRoute exact path="/register" >
                    <UserForm />
                </NonLoggedRoute>
                <PrivateRoute path="/profile" >
                    <UserForm />
                </PrivateRoute>
                <PrivateRoute path="/new/product" >
                    <ProductForm />
                </PrivateRoute>
                <PrivateRoute path="/update/product/:flag" component={ProductForm} />
                <PrivateRoute path="/cart" > 
                    <Cart />
                </PrivateRoute>
                <PrivateRoute path="/orders" >
                    <Orders />
                </PrivateRoute>
            </Switch>
        </div>
    )
}

export default Dashboard