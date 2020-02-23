
import React, { Component, Fragment } from 'react'
import { apiDetails } from '../services/ApiService'

export const withDetails = (type, WrappedComponent) => {
  return class extends Component {
    state = {
      details: {}
    }

    async componentDidMount() {
      const { match: { params } } = this.props
      const para = params.id || params.flag
      const details = await apiDetails[type](para)
      this.setState({ details })
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
