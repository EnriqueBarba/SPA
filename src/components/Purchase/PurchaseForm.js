import React, {Component} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom'
import { purchase as Purchase} from '../../services/ApiService';
import { WithCartConsumer } from '../../context/CartContext';

class CheckoutForm extends Component {
  state = {
      id: '',
      item: '',
      completedPay : false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.stripe) {
        this.props.stripe.createToken()
        .then( ({token}) => {
          if (token){
            
            if (this.state.item === 'order') {
              const data = {
                  order: this.state.id,
                  stripeToken: token.id
              }

              Purchase(data)
                .then(payment => {
                    console.info('Payment', payment)
                    this.setState({
                      completedPay : true
                    })
                })
            } else if (this.state.item === 'cart') {
              const data = {
                stripeToken: token.id
              }

              this.props.purchaseCart(data)

              this.setState({
                completedPay : true
              })

            }
          }
        })
      }
  }

  componentDidMount = () => {
    const item = this.props.match.params.item
    const itemId =  this.props.match.params.id
    this.setState({
        ...this.state,
        id: itemId,
        item: item
    })
  };

  render() {
    if (!this.state.completedPay){

      return (
        <div className="container">
          <p>Please, fill the payment details:</p>
          <div className='col'>
            <CardElement style={{
                base: {
                    iconColor: 'rgb(219, 157, 41)',
                    color: '#6c757d',
                    lineHeight: '40px',
                    fontWeight: 400,
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSize: '16px',
                    '::placeholder': {
                        color: 'rgb(219, 157, 41)',
                    }
                }
            }} />
          </div>
          <button className='btn btn-light function-btn' text='Pagar' width='w-100' onClick={this.handleSubmit}>Confirm & Purchase</button>
        </div>
      );
    }

    return (
      <Redirect to='/'/>
    );
  }
}


export default WithCartConsumer(injectStripe(CheckoutForm))