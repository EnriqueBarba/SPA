import React, { createContext } from 'react'
import { logout as serviceLogout } from '../services/ApiService';

const AuthContext = createContext();

export class AuthContextProvider extends React.Component {

    state = {
        user: JSON.parse(localStorage.getItem('user'))
    }

    setUser = (user) => {
        localStorage.setItem('user', user ? JSON.stringify(user) : null)
        this.setState({user})
    }

    logout = () => {
        serviceLogout().then( () => this.setUser() )
    }

    render() {
        const user = this.state.user
        console.log(user)
        const value = {
            currentUser: user,
            setUser: this.setUser,
            logout: this.logout
          }

        return(
            <AuthContext.Provider value={value}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

}

export const WithAuthConsumer = (WrappedComponent) => (props) => (
    <AuthContext.Consumer>
      {(authProps) => (<WrappedComponent {...props} {...authProps} />)}
    </AuthContext.Consumer>
);

export default AuthContext;