import React from 'react'
import { withDetails } from '../hocs/withDetails'
import {PRODUCTS_KEY} from '../services/constants'
import BuyProduct from '../components/BuyProduct'

const ProductDetails = ({name = '', images = [], description = '', price=0, ammountLeft=0, id=''}) =>
  <div className="details">
    <div className="Product item-info">
      <h2>{name}</h2>
      <img src={images[0]} alt='product' />
      <p>{description}</p>
      <p>Price: <b>{price}€</b></p>
      <p>Stock left: {ammountLeft}</p>
      <BuyProduct id={id} price={price}/>
    </div>
  </div>

export default withDetails(PRODUCTS_KEY, ProductDetails)