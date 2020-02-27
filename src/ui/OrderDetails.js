import React from 'react'

const OrderDetails = ({order}) => {
    return(
        <div>Order
            <h6>{order.product.name}</h6>
        </div>
    )
}

export default OrderDetails