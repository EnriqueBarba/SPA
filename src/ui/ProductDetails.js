import React from 'react'
import { WithDetails } from '../hocs/WithDetails'
import {PRODUCTS_KEY} from '../services/constants'
import BuyProduct from '../components/Product/BuyProduct'
import { WithAuthConsumer } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import DeleteProduct from '../components/Product/DeleteProduct'
import { Card, Image } from 'react-bootstrap'

const ProductDetails = ({name = '', images = [], description = '', price=0, ammountLeft=0, id='', owner='', flag='', currentUser={}}) =>{

return (
  <Card className="details">
    <div className="Product item-info">
      <Card.Title>{name}</Card.Title>
      <div>
        <Image src={images[0]} alt='product' thumbnail />
        {images.length > 1 &&
          <div className="extra-images row">
            {images.map((e,i) => { 
              if (i > 0){
                  return <Image key={i} src={e} fluid thumbnail alt={`product${i}`}/> 
              } else {
                return null;
              }
            })}
          </div>
        }
      </div>
      <div>
        <Card.Text className="description mt-2">
          {description}<br/>
        </Card.Text>
        <Card.Text>
          <b>Precio:</b> {price}€<br/>
          <b>Stock:</b> {ammountLeft}<br/>
        </Card.Text>
      </div>
      {currentUser && currentUser.id === owner && <>
        <div className="mt-4 row d-flex justify-content-center">
          <div className="d-inline mr-2">
            <Link to={`/update/product/${flag}`} 
              className='btn btn-light function-btn mb-2'>Editar <i className="fa fa-edit text-upd"></i></Link>
          </div>
          <div className="d-inline ml-2">
            <DeleteProduct prodId={id} />
          </div>
        </div>
        </>  
      }
      <Card.Footer>
        <BuyProduct id={id} price={price}/>
      </Card.Footer>
    </div>
  </Card>
)}

export default WithDetails(PRODUCTS_KEY, WithAuthConsumer(ProductDetails))