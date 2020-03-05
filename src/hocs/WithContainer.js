
import React, { Component, Fragment } from 'react'
import { apiList } from '../services/ApiService'
import {PRODUCTS_KEY, CAT_KEY,PRODUCT_NAME} from '../services/constants'
import CategorySearch from '../components/Search/CategorySearch'
import { Spinner } from 'react-bootstrap'


export const WithContainer = (type, WrappedComponent) => {
  return class extends Component {
    state = {
      list: [],
      loading: true
    }
    
    async componentDidMount() {
      const param = this.props.match.params

      if ( (PRODUCTS_KEY === type) &&
        ( (param && Object.keys(param)[0] === 'search') ) ) {
        const list = await apiList[PRODUCT_NAME](param.search)
        this.setState({
          loading: false,
          list: list
        })
      } else  {
        const list = await apiList[type]()
        this.setState({ 
          loading: false,
          list: list 
        })
      }

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
        this.setState({
          ...this.state,
          list:list
        })
      } else if ( (PRODUCTS_KEY === type) &&
        ( ( prevPath !== currPath && currValue === 'search') 
        || ( (currValue === 'search') && (prevValue === currValue) && (prevParam.search !== currParam.search) ) ) ) {
        const list = await apiList[PRODUCT_NAME](currParam.search)
        this.setState({
          ...this.state,
          list:list
        })
      } else if ( this.props.match.path === '/' && prevProps.match.path !== '/' ) {
        const list = await apiList[type]()
        this.setState({ 
          ...this.state,
          list:list 
        })
      }

    }

    render() {
      const { list, loading } = this.state

      if (loading) {
        return (<Spinner animation="grow" />)
      }

      return (
        <Fragment>
          {loading && <Spinner animation="grow" />}
          {!loading && <>
            {PRODUCTS_KEY === type && <CategorySearch />}
            <WrappedComponent {...{list}} />
            </>
          }
        </Fragment>
      )
    }
  }
} 