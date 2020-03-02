import React from 'react'

const OrderDetails = ({order, remove}) => {
    return(
        <div className='Order card'>
            <img className='card-img-top' src={order.product.images[0]} alt="Product" />
            <div className='card-body'>
                <h5 className='card-title'>{order.product.name}</h5>
                <p className='card-text'>
                    Items: {order.ammount} - Price: {order.buyingPrice}€<br/>
                    Total price: {order.ammount * order.buyingPrice}€
                </p>
            </div>
            <div>
                <button className='btn btn-light function-btn' onClick={() => remove({orderId:order.id})}>Remove</button>
            </div>
        </div>
    )
}

export default OrderDetails