import React, { createContext } from 'react'
import { logout as serviceLogout } from '../services/ApiService';

const AuthContext = createContext();

export class AuthContextProvider extends React.Component {

    state = {
        user: JSON.parse(localStorage.getItem('user')) //parse json local storage
    }

    setUser = (user) => {
        localStorage.setItem('user', user ? JSON.stringify(user) : null)
        this.setState({user})
    }

    logout = () => {
        serviceLogout().then( () => this.setUser() )
    }

    render() {
        const value = {
            currentUser: this.state.user,
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

//export 

export const WithAuthConsumer = (WrappedComponent) => (props) => (
    <AuthContext.Consumer>
      {(authProps) => (<WrappedComponent {...props} {...authProps} />)}
    </AuthContext.Consumer>
  )
  
export default AuthContext;