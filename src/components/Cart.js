import React from 'react'
import { WithCartConsumer } from '../context/CartContext'
import OrderDetails from '../ui/OrderDetails'
import { Link } from 'react-router-dom'

const Cart = ({cart, getCart, updateOrder}) => {

    if (Object.keys(cart).length === 0) {
        getCart()
    }

    const items = cart.order ? cart.order.length : 'no'
    const orders = cart.order ? [...cart.order] : []
    return (
        <div className='Cart container'>
            <h4>You have {items} items in your cart</h4>
            <Link className="btn btn-light function-btn" to={`/confirm/cart/${cart.id}`}>Buy All</Link>
            <ul className=''>
                {orders.map((e,i) => <li className='col-sm-12 col-md-6 col-xl-3 mb-2' key={i}><OrderDetails order={e} remove={updateOrder}/></li>)}
            </ul>
            {orders.length > 10 && 
                <Link className="btn btn-light function-btn" to={`/confirm/cart/${cart.id}`}>Buy All</Link>
            }
        </div>
    )

}

export default WithCartConsumer(Cart)