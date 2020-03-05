import React from 'react'
import { PRODUCTS_KEY } from '../services/constants'
import { WithContainer } from '../hocs/WithContainer'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Products = ({ list }) =>{

return (   
<div className='Products row'>
        {list.map((prod, i) =>
            <Link className="Product mb-2" key={i} to={`/product/details/${prod.flag}`}>
                <Card >
                    <Card.Title>{prod.name}</Card.Title>
                    <div className="image-prod">
                        <Card.Img src={prod.images[0]} alt='Product' />
                    </div>
                    <Card.Text>
                        Price: {prod.price}€
                    </Card.Text>
                </Card>
            </Link>
        )}
    </div>)
}
    export default WithContainer(PRODUCTS_KEY, Products)