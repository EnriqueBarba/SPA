import React from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import PurchaseForm from './PurchaseForm'

class ConfirmPurchase extends React.Component {
  
    render() {
      return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <div className="card-pay">
          <Elements>
            <PurchaseForm {...this.props}/>
          </Elements>
        </div>
      </StripeProvider>
      );
    }
}

export default ConfirmPurchase