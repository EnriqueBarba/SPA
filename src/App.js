import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidemenu from './components/Sidemenu';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="wrapper">
        <Sidemenu />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
