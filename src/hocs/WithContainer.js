
import React, { Component, Fragment } from 'react'
import { apiList } from '../services/ApiService'


export const WithContainer = (type, WrappedComponent) => {
  return class extends Component {
    state = {
      list: []
    }

    async componentDidMount() {
      const list = await apiList[type]()
      this.setState({ list })
    }

    render() {
      const { list } = this.state
      return (
        <Fragment>
          <WrappedComponent {...{list}} />
        </Fragment>
      )
    }
  }
} 