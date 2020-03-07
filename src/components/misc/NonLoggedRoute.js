import React from 'react'
import { Route, Redirect } from 'react-router'
import { WithAuthConsumer } from '../../context/AuthContext'

const NonLoggedRoute  = (props) => {
  if (props.currentUser) {
    return <Redirect to='/' />
  } else {
    return <Route {...props} />
  }
}

export default WithAuthConsumer(NonLoggedRoute)