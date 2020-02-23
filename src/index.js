import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
    <Router>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </Router>, 
document.getElementById('root'));


serviceWorker.unregister();
