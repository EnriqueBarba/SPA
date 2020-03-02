import React from 'react'
import { WithDetails } from '../hocs/WithDetails'
import {PRODUCTS_KEY} from '../services/constants'
import BuyProduct from '../components/Product/BuyProduct'
import { WithAuthConsumer } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const ProductDetails = ({name = '', images = [], description = '', price=0, ammountLeft=0, id='', owner='', flag='', currentUser={}}) =>
  <div className="details">
    <div className="Product item-info">
      <h2>{name}</h2>
      <img src={images[0]} alt='product' />
      <p>{description}</p>
      <p>Precio: <b>{price}€</b></p>
      <p>Unidades en stock: {ammountLeft}</p>
      {currentUser.id === owner && <Link to={`/update/product/${flag}`} className='btn btn-light function-btn mb-2'>Edit</Link>}
      <BuyProduct id={id} price={price}/>
    </div>
  </div>

export default WithDetails(PRODUCTS_KEY, WithAuthConsumer(ProductDetails))