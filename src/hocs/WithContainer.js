
import React, { Component, Fragment } from 'react'
import { apiList } from '../services/ApiService'
import {PRODUCTS_KEY, CAT_KEY,PRODUCT_NAME} from '../services/constants'
import CategorySearch from '../components/Search/CategorySearch'


export const WithContainer = (type, WrappedComponent) => {
  return class extends Component {
    state = {
      list: []
    }
    
    async componentDidMount() {
      const list = await apiList[type]()
      this.setState({ list })
    }

    async componentDidUpdate(prevProps) {
      const prevParam = prevProps.match.params
      const prevPath = prevProps.match.path
      const currParam = this.props.match.params
      const currPath = this.props.match.path
      const prevValue = Object.keys(prevParam)[0] ? Object.keys(prevParam)[0].toString() : ''
      const currValue = Object.keys(currParam)[0] ? Object.keys(currParam)[0].toString() : ''

      if ( (PRODUCTS_KEY === type) &&
        ( (prevPath !== currPath && currValue === 'cat') 
        || ( (currValue === 'cat') && (prevValue === currValue) && (prevParam.cat !== currParam.cat) ) ) ) {
        const list = await apiList[CAT_KEY](currParam.cat)
        this.setState({list})
      } else if ( (PRODUCTS_KEY === type) &&
        ( ( prevPath !== currPath && currValue === 'search') 
        || ( (currValue === 'search') && (prevValue === currValue) && (prevParam.search !== currParam.search) ) ) ) {
        const list = await apiList[PRODUCT_NAME](currParam.search)
        this.setState({list})
      } else if ( this.props.match.path === '/' && prevProps.match.path !== '/' ) {
        const list = await apiList[type]()
        this.setState({ list })
      }

    }

    render() {
      const { list } = this.state
      return (
        <Fragment>
          {PRODUCTS_KEY === type && <CategorySearch />}
          <WrappedComponent {...{list}} />
        </Fragment>
      )
    }
  }
} 