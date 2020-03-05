import React, { useState } from 'react'
import { ORDERS_KEY } from '../services/constants'
import { WithContainer } from '../hocs/WithContainer'
import { CardDeck, Card, Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import ConfirmPurchase from '../components/Purchase/ConfirmPurchase'

const Orders = ({ list }) => {
    
    const [{showModal, orderId}, setData] = useState({showModal:false,orderId:''});

    const handleClose = () => {
        setData({showModal:false, orderId:''});
    }
    const handleShow = (id) => {
        setData({showModal:true, orderId:id});
    }
    
    return(<>
        <h2 className="mt-4 mb-4">Pedidos:</h2>
        <CardDeck className="Orders row flex-column">
            {
                list.map((order, i) =>
                    <Card key={i} className='Order row flex-row' >
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
                                {(!order.payment || !order.payment.paid) && 
                                    <><Button className="btn btn-light gold-btn function-btn" onClick={() => handleShow(order.id)}>
                                        <i className="my-color-icon fa fa-money"></i>  Pagar Ahora
                                    </Button>
                                    </>}                
                            </Card.Footer>
                        </Card.Body>
                    </Card>

                )
            }
        </CardDeck>
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación del pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ConfirmPurchase item={'order'} id={orderId}/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>)
}
export default WithContainer(ORDERS_KEY, Orders)