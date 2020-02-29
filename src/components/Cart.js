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
        <div className='Cart container'>
            <h4>You have {items} items in your cart</h4>
            <button>Buy All</button>
            <ul className='col-sm-12'>
                {orders.map((e,i) => <li className='col-sm-12 mb-2' key={i}><OrderDetails order={e}/></li>)}
            </ul>
            <button>Buy All</button>
        </div>
    )

}

export default WithCartConsumer(Cart)