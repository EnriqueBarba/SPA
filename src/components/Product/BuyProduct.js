import React from 'react'
import { createOrder, addToCart } from '../../services/ApiService';
import { Redirect } from 'react-router-dom';

class BuyProduct extends React.Component{
    state={
        quantity: 1,
        doBuy: false,
        doCart: false,
        error: false,
        order: null,
        addedToCart: false
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleClick = (e) => {
        const name = e.target.name
        this.setState({
            ...this.state,
            [name]: !this.state.name
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            product: this.props.id,
            price: this.props.price,
            ammount: this.state.quantity
        }

        if (this.state.doBuy) {
            createOrder(obj)
            .then(o => {
                this.setState({
                    ...this.state,
                    order: o.id
                })
            }).catch(_ => {
                this.setState({
                    ...this.state,
                    error: true
                })
            })
            
        } else if (this.state.doCart) {
            
            addToCart(obj)
            .then((c) => {
                this.setState({
                    ...this.state,
                    addedToCart: true
                })
            })
            .catch(_ => {
                this.setState({
                    ...this.state,
                    error: true
                })
            })
            
        }

    }

    render(){
        const {quantity, error, order, addedToCart} = this.state;

        if (order) {
            return <Redirect to={`/confirm/order/${order}`} />
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    { addedToCart &&  
                        <div className="Success feedback">
                            Successfully added to cart
                        </div>
                    }
                    <input type='number' value={quantity} onChange={this.handleChange} min={1} name='quantity'/>
                    { error &&  
                        <div className="Error feedback">
                            Ops something went wrong
                        </div>
                    }
                </div>
                <div className="d-flex justify-content-around">
                    <input className="btn btn-light function-btn" id="doBuy" name="doBuy" type="submit" value='Buy now' onClick={this.handleClick}/>
                    <input className="btn btn-light function-btn" id="doCart" name="doCart" type="submit" value='Add to Cart' onClick={this.handleClick}/>
                </div>
            </form>
        )
    }
}

export default BuyProduct