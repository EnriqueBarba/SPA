import React from 'react'
import { WithCartConsumer } from '../context/CartContext'
import OrderDetails from '../ui/OrderDetails'
import { Link } from 'react-router-dom'

const Cart = ({cart, getCart}) => {

    if (Object.keys(cart).length === 0) {
        getCart()
    }

    const items = cart.order ? cart.order.length : '0'
    const orders = cart.order ? cart.order : []

    return (
        <div className='Cart container row'>
            <h4 className="mb-2 col-12">Tienes {items} productos en tu cesta</h4>
            <Link className="btn btn-light function-btn mb-2 col-12" to={`/confirm/cart/${cart.id}`}>Comprar todo</Link>
                {orders.map((e,i) => <OrderDetails key={i} order={e} />)}
            {orders.length > 10 && 
                <Link className="btn btn-light function-btn mt-2 col-12" to={`/confirm/cart/${cart.id}`}>Comprar todo</Link>
            }
        </div>
    )

}

export default WithCartConsumer(Cart)