import React from 'react';
import Navbar from './components/misc/Navbar';
import Sidemenu from './components/misc/Sidemenu';
import Dashboard from './components/Dashboard';

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
