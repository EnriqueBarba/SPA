import React from 'react'
import { Route, Redirect } from 'react-router'

const PrivateRoute  = ({component: Component, currentUser, ...rest}) => (
  console.info('currentUser ',currentUser) ||
  <Route {...rest} render={props =>
        (currentUser)  ? (<Component {...props} />) 
        : (<Redirect to='/' {...props} />)
  }
  />
)


export default PrivateRoute