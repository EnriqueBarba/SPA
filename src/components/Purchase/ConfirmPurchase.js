import React from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import PurchaseForm from './PurchaseForm'

class ConfirmPurchase extends React.Component {
  
    render() {
      console.info('Props ', this.props)
      return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <div className="card-pay">
          <h6>Order by</h6>
          <Elements>
            <PurchaseForm {...this.props}/>
          </Elements>
        </div>
      </StripeProvider>
      );
    }
}

export default ConfirmPurchase