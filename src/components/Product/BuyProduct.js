import React from 'react'
import { createOrder, addToCart } from '../../services/ApiService';
import { Modal } from 'react-bootstrap';
import ConfirmPurchase from '../Purchase/ConfirmPurchase';

class BuyProduct extends React.Component{
    state={
        quantity: 1,
        doBuy: false,
        doCart: false,
        error: false,
        order: null,
        addedToCart: false,
        showModal: false
    }

    
    handleModal = () => {
        this.setState({
            ...this.state,
            showModal: !this.state.showModal
        })
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
                    order: o.id,
                    showModal:true
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

        return (
            <form className="Buy-product" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    { addedToCart &&  
                        <div className="Success feedback">
                            Añadido correctamente!
                        </div>
                    }
                    <label htmlFor="quantity">Comprar productos: </label><br/>
                    <input type='number' value={quantity} onChange={this.handleChange} min={1} name='quantity' id='quantity'/>
                    { error &&  
                        <div className="Error feedback">
                            Ops algo ha ido mal...
                        </div>
                    }
                </div>
                <div className="d-flex justify-content-around">
                    <input className="btn btn-light function-btn" id="doBuy" 
                        name="doBuy" type="submit" value='Comprar ya' onClick={this.handleClick}/>
                    <input className="btn btn-light function-btn" id="doCart" 
                        name="doCart" type="submit" value='Añadir a la cesta' onClick={this.handleClick}/>
                </div>

                <>
                    <Modal show={this.state.showModal} onHide={this.handleModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>Confirmación del pago</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ConfirmPurchase item={'order'} id={order}/>
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </>

            </form>
        )
    }
}

export default BuyProduct