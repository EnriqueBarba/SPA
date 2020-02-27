import React, { createContext } from 'react'
import { addToCart, updateCart, getCart } from '../services/ApiService';

const CartContext = createContext();

export class CartContextProvider extends React.Component {

    state={
        cart:{}
    }

    setCart(c) {
        this.setState({cart: c})
    }

    getCart = () => {
        getCart().then(c => {
            this.setCart(c)
        })
    }

    addOrder = (obj) => {
        addToCart(obj).then( c => this.setCart(c) )
    }

    
    updateOrder = (obj) => {
        updateCart(obj).then( c => this.setCart(c) )
    }

    render() {
        const value = {
            cart: this.state.cart,
            getCart: this.getCart,
            addOrder: this.addOrder,
            updateOrder: this.updateOrder
          }
        return(
            <CartContext.Provider value={value}>
                {this.props.children}
            </CartContext.Provider>
        )
    }

}

export const WithCartConsumer = (WrappedComponent) => (props) => (
    <CartContext.Consumer>
      {(cartProps) => (<WrappedComponent {...props} {...cartProps} />)}
    </CartContext.Consumer>
  )
  
export default CartContext;