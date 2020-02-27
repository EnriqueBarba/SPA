import React from 'react'
import { WithCartConsumer } from '../context/CartContext'
import OrderDetails from '../ui/OrderDetails'

const Cart = ({cart, getCart}) => {

    if (Object.entries(cart).length === 0) {
        getCart()
    }

    const items = cart.order ? cart.order.length : 'no'
    const orders = cart.order ? [...cart.order] : []
    return (
        <div>
            <h3>You have {items} items in your cart</h3>
            <ul>
                {orders.map((e,i) => <li key={i}><OrderDetails order={e}/></li>)}
            </ul>
            {JSON.stringify(cart)}
        </div>
    )

}

export default WithCartConsumer(Cart)