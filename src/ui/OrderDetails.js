import React from 'react'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { WithCartConsumer } from '../context/CartContext'

const OrderDetails = ({order, updateOrder}) => {
    return(

        <Card className='Cart-order card col-12 mb-2'>
            <div className="image-order">
               <Card.Img variant="top" src={order.product.images[0]} alt="Product" />
            </div>
            <Card.Body >
            <Card.Title>{order.product.name}</Card.Title>
                <Card.Text className='card-text'>
                    Unidades: {order.ammount} - Precio: {order.buyingPrice}€<br/>
                    Precio total: {order.ammount * order.buyingPrice}€
                </Card.Text>
            </Card.Body>
            <Button className="btn btn-light function-btn" onClick={()=>updateOrder({orderId:order.id})}>Eliminar </Button>
        </Card>

    )
}

export default WithCartConsumer(OrderDetails)