import React from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Navbar />
      </div>
      <div className="wrapper">
        <div className="collapse" id="sideMenu">
          <div className="bg-dark p-4 ">
            <h4 className="text-white">Collapsed content</h4>
            <span className="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <div className="Dashboard">APLICACION</div>
      </div>
    </div>
  );
}

export default App;
