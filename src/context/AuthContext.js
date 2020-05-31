import React, { createContext } from 'react'
import { logout as serviceLogout } from '../services/ApiService';

const AuthContext = createContext();

export class AuthContextProvider extends React.Component {

    state = {
        user: localStorage.getItem('user') ? localStorage.getItem('user') : null
    }

    setUser = (user) => {
        localStorage.setItem('user', user ? user : null)
        this.setState({user})
    }

    logout = () => {
        serviceLogout().then( () => this.setUser() )
    }

    render() {
        const user = this.state.user
        const value = {
            currentUser: JSON.parse(user),
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