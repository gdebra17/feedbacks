import React, { Component } from 'react';
//import './App.css';
//import About from "./modules/about/About";
//import Tchat from "./modules/Tchat/Tchat";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


import Form from "./modules/form/form";
//import About from "./modules/about/About";


class App extends Component {
  render() {

    return (
      <div>

      <div className="container">
        {/* <About /> */}
        {/* <Tchat /> */}
<Form />
      </div>
      </div>
    );
  }
}

export default App;
