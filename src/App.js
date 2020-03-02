import React from 'react';
import MyNavbar from './components/misc/MyNavbar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <div className="wrapper">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
