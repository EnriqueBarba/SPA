import React from 'react'
import { ORDERS_KEY } from '../services/constants'
import { WithContainer } from '../hocs/WithContainer'
import { Link } from 'react-router-dom'
import { CardDeck, Card } from 'react-bootstrap'

const Orders = ({ list }) =>
    <>
        <h2>Pedidos:</h2>
        <CardDeck className="Orders row flex-column">
            {
                list.map((order, i) =>
                <Link key={i} to={`/order/${order.id}`}>
                    <Card className='Order row flex-row' >
                        <Card.Title className="col-12">{order.product.name}</Card.Title>
                        <div className="image-order justify-content-around d-flex">
                            <Card.Img src={order.product.images[0]} alt='Order' />
                        </div>
                        <Card.Body className="">
                            <Card.Text className="text-muted">{order.createdAt}</Card.Text>
                            <Card.Text>
                                Precio: {order.buyingPrice}€<br />
                                Unidades: {order.ammount}<br />
                            </Card.Text>
                            <Card.Footer>
                                {order.payment && order.payment.paid && <>Pagado</>}
                                {(!order.payment || !order.payment.paid) && <>Sin pagar</>}
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                </Link>
                )
            }
        </CardDeck>
    </>

export default WithContainer(ORDERS_KEY, Orders)