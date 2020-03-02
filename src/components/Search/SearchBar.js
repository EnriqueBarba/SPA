import React from 'react'
import { Link } from 'react-router-dom'


class SearchBar extends React.Component  {
    state= {
        search: ''
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {

        return (
            <div className="search-bar" role="search">
                <div className="d-flex"> 
                <input className="form-control" 
                    type="text" name="search" placeholder="Buscar productos..." 
                    onChange={this.handleChange} value={this.state.search} />
                <Link to={`/products/search/${this.state.search}`} 
                    replace={true} className="search-button" 
                    type="submit" value=""><i className="fa fa-search"></i></Link>
                </div>
            </div>
        )
    }
}

export default SearchBar