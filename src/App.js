import React, { Component } from 'react';
import './App.css';
import TestForm from "./modules/form/TestForm";
import Form from "./modules/form/form";


//import './App.css';
//import About from "./modules/about/About";
import Tchat from "./modules/Tchat/Tchat";
import Tchat0 from "./modules/Tchat/Tchat0";
import Buttons from "./modules/Buttons";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'



class App extends Component {
  render() {

    return (
      <Router>
        <div>
            <Route path="/" component={Buttons}/>
            <Route exact path="/" component={Form}/>
            <Route exact path="/IP/:id" component={Tchat} />
            <Route exact path="/:id" component={Tchat} />
          </div>
      </Router>
    );
  }
}
// <Route path="/chats/:id" component={ChatComponent} />

export default App;
