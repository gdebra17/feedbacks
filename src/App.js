import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import './App.css';
import TestForm from "./modules/form/TestForm";
import Form from "./modules/form/form";

import About from "./modules/about/About";
//import Tchat from "./modules/Tchat/Tchat";
// import Tchat0 from "./modules/Tchat/Tchat0";
import Buttons from "./modules/Buttons";
import Header from "./modules/header/header";

class App extends Component {
  render() {

    return (
      <Router>
        <div className="container">
            <Route path="/" component={Buttons}/>
            <Route exact path="/" component={Header}/>
            <Route exact path="/" component={Form}/>
            {/* <Route exact path="/chats" component={Tchat} /> */}
            {/* <Route exact path="/user" component={Tchat0} /> */}
            <Route exact path="/testform" component={TestForm} />
            <Route exact path="/about" component={About} />
          </div>
      </Router>

    );
  }
}
// <Route path="/chats/:id" component={ChatComponent} />

export default App;
