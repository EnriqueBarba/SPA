import React, {Component} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom'
import { purchase as Purchase} from '../../services/ApiService';

class CheckoutForm extends Component {
  state = {
      order: '',
      completedPay : false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.stripe) {
        this.props.stripe.createToken()
        .then(({token}) => {
          if(token){
              
            const data = {
                order: this.state.order,
                stripeToken: token.id
            }

            Purchase(data)
                .then(payment => {
                    console.info('Payment', payment)
                })

            /*
            PaymentService.paymentOrder(table.orderId, data)
            const cleanTable = {
              ...this.state.table,
              orders : [],
              orderId : '',
              payStatus : 'payed'
            }
            TableService.cleanTable(cleanTable)
            */
            this.setState({
              completedPay : true
            })
          }
        })
      }
  }

  componentDidMount = () => {
   /* this.tableSubscription = TableService.onTableChange().subscribe(table =>
      this.setState({ table: table}))
      */
     const orderId =  this.props.match.params.id
     this.setState({
         ...this.state,
         order: orderId
     })

     //purchase()

    };

  componentWillUnmount() {
    //this.tableSubscription.unsubscribe();
  }

  render() {
    if(!this.state.completedPay){

      return (
        <div className="checkout">
          <p>Please, fill the payment details:</p>
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
          <button color='btn btn-pink-color-white' text='Pagar' width='w-100' onClick={this.handleSubmit}>Confirm & Purchase</button>
        </div>
      );
    }
    return (
    <Redirect to='/'/>
    );
  }
}

export default injectStripe(CheckoutForm);