import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Products from '../ui/Products'
import Login from './Login'
import ProductDetails from '../ui/ProductDetails'
import UserForm from './UserForm'
import { WithAuthConsumer } from '../context/AuthContext'
import ProductForm from './Product/ProductForm'
import Cart from './Cart'
import ConfirmPurchase from './Purchase/ConfirmPurchase'

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
                        <Route exact path="/new/product" component={ProductForm}/>
                        <Route exact path="/update/product/:flag" component={ProductForm}/> 
                        <Route exact path="/cart" component={Cart}/> 
                        <Route exact path="/confirm/:id" component={ConfirmPurchase}/> 
                    </>
                }
            </Switch>
        </div>
    )
}

export default WithAuthConsumer(Dashboard)