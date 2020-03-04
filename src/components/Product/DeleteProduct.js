import React from 'react'
import { deleteProduct } from '../../services/ApiService';
import { Redirect } from 'react-router-dom';

class DeleteProduct extends React.Component {
    state={
        id: '',
        redirect: false
    }

    componentDidMount() {
        if (this.props.prodId){
            const id = this.props.prodId
            this.setState({
                ...this.state,
                id: id
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.info(this.state)
        const data = {id: this.state.id}
        deleteProduct(data).then(_ => 
            this.setState({
                ...this.state,
                redirect: true
            })
        )
    }

    render(){

        if (this.state.redirect) {
            return <Redirect to="/"/>
        }

        return(
            <form onSubmit={this.handleSubmit}>
                <button to={`/delete/product/${this.state.id}`} 
                    className='btn btn-light function-btn mb-2'>Eliminar <i className="fa fa-trash text-del"></i>
                </button>
            </form>
        )
    }
}

export default DeleteProduct