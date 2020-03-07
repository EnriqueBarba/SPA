import React from 'react'
import { Route, Redirect } from 'react-router'
import { WithAuthConsumer } from '../../context/AuthContext'

const PrivateRoute  = (props) => {
  if (!props.currentUser) {
    return <Redirect to='/login' />
  } else {
    return <Route {...props} />
  }
}

export default WithAuthConsumer(PrivateRoute)