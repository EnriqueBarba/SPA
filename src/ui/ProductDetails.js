import React from 'react'
import { withDetails } from '../hocs/withDetails'
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
      <p>Price: <b>{price}€</b></p>
      <p>Stock left: {ammountLeft}</p>
      <BuyProduct id={id} price={price}/>
      {currentUser.id === owner && <Link to={`/update/product/${flag}`} className='btn btn-secondary'>Edit</Link>}
    </div>
  </div>

export default withDetails(PRODUCTS_KEY, WithAuthConsumer(ProductDetails))