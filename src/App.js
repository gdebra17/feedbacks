import React, { Component } from 'react';
import './App.css';

import About from "./modules/about/About";

class App extends Component {
  render() {
    return (
      <div className="container">
        <About />
      </div>
    );
  }
}

export default App;
