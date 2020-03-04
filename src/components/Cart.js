import React, { useState } from 'react'
import { WithCartConsumer } from '../context/CartContext'
import OrderDetails from '../ui/OrderDetails'
import { Modal } from 'react-bootstrap'
import ConfirmPurchase from './Purchase/ConfirmPurchase'
import { Button } from 'react-bootstrap'

const Cart = ({cart, getCart}) => {

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (Object.keys(cart).length === 0) {
        getCart()
    }

    const items = cart.order ? cart.order.length : '0'
    const orders = cart.order ? cart.order : []

    return (
        <div className='Cart container row'>
            <h4 className="mb-2 col-12 mt-4 mb-4">Tienes {items} productos en tu cesta</h4>
            {orders.length > 0 &&
                <Button className="btn btn-light function-btn mb-2 col-12" onClick={() => handleShow()}>Comprar todo</Button>
            }
                {orders.map((e,i) => <OrderDetails key={i} order={e} />)}
            {orders.length > 10 && 
                <Button className="btn btn-light function-btn mt-2 col-12" onClick={() => handleShow()}>Comprar todo</Button>
            }
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Confirmación del pago</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ConfirmPurchase item={'cart'} id={cart.id}/>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )

}

export default WithCartConsumer(Cart)