import React, { Component } from 'react';
import './App.css';

import About from "./modules/about/About";
import Tchat from "./modules/Tchat/Tchat";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


class App extends Component {
  render() {

    return (
      <div className="container">
        <About />
        <Tchat />
      </div>
    );
  }
}

export default App;
