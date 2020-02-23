import React from 'react'

class SearchBar extends React.Component  {
    state= {
        search: ''
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("llamada") //TODO
    }

    render() {
        
        return (
            <form className="search-bar" action="" onSubmit={this.handleSubmit} method="get" role="search">
                <div className="d-flex"> 
                <input className="form-control" type="text" name="search" placeholder="Search..." onChange={this.handleChange} value={this.state.search} />
                <button className="search-button" type="submit" value=""><i className="fa fa-search"></i></button>
                </div>
            </form>
        )
    }
}

export default SearchBar