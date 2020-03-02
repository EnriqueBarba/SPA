import React from 'react'
import {ORDERS_KEY} from '../services/constants'
import {WithContainer} from '../hocs/WithContainer'
import { Link } from 'react-router-dom'

const Orders = ({list}) => 
    <>
    <h2>Orders:</h2>
    <ul className='Orders'>
        { 
        list.map((order,i) => 
            <li className='Product mb-2' key={i}>
                <Link to={`/order/${order.id}`}>
                    <h2>{order.product.name}</h2>
                    <img src={order.product.images[0]} alt='Product'/>
                    <p>
                        <label>Price:</label>   
                        <span> {order.buyingPrice}€</span><br/>
                        <label>Units:</label>   
                        <span> {order.ammount}</span>
                    </p>
                </Link>
            </li>
        )
        }
    </ul>
    </>

export default WithContainer(ORDERS_KEY, Orders)