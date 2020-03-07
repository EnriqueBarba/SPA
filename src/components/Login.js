import React from 'react'
import { login } from '../services/ApiService';
import { WithAuthConsumer } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import { WithCartConsumer } from '../context/CartContext';

class Login extends React.Component {

    state = {
        data:{
            email: '',
            password: ''
        },
        auth: false
    }
    

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            ...this.state,
            data:{
                ...this.state.data,
                [name]: value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        login({...this.state.data})
            .then(user =>{
                this.props.setUser(user)
                this.props.getCart()
                this.setState({auth:true})
 
                })
            .catch(console.error)
        
    }

    render() {
        const {auth, data} = this.state;
        
        if (auth) {
            return (<Redirect to="/"/>)
        }
        

        return (
            <form  action='/login' method='POST' onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={data.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" id="password" onChange={this.handleChange} value={data.password}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-warning">Log In</button>
                </div>
            </form>
        )
    }
}

export default WithCartConsumer(WithAuthConsumer(Login))