import React, { Component, Fragment } from 'react'
import { apiDetails } from '../services/ApiService'

export const WithDetails = (type, WrappedComponent) => {
  return class extends Component {
    state = {
      details: {}
    }

    componentDidMount() {
      const { match: { params } } = this.props
      const para = params.id || params.flag
      apiDetails[type](para).then(details => {
        this.setState({ details })
      })
      
    }

    render() {
      const { details } = this.state
      return (
        <Fragment>

          <WrappedComponent {...details} />
        </Fragment>
      )
    }
  }
}
