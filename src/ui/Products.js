import React from 'react'
import {PRODUCTS_KEY} from '../services/constants'
import {WithContainer} from '../hocs/WithContainer'
import { Link } from 'react-router-dom'

const Products = ({list}) => 
    <ul className='Products'>
        { 
        list.map((prod,i) => 
            <li className='Product mb-2' key={i}>
                <Link to={`/product/details/${prod.flag}`}>
                    <h2>{prod.name}</h2>
                    <img src={prod.images[0]} alt='Product'/>
                    <p>
                        <label>Price:</label>   
                        <span> {prod.price}€</span>
                    </p>
                </Link>
            </li>
        )
        }
    </ul>


export default WithContainer(PRODUCTS_KEY, Products)