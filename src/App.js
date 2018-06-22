import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//import './App.css';
import TestForm from "./modules/form/TestForm";
import Form from "./modules/form/Form";
import Dashboard from "./modules/dashboard/Dashboard";
import About from "./modules/about/About";
import Discussion from "./modules/Tchat/Discussion";
import Tchat from "./modules/Tchat/Tchat";
// import Tchat0 from "./modules/Tchat/Tchat0";
import Buttons from "./modules/Buttons";


class App extends Component {

  getDiscussion = (routerProps) => {
    console.log("routerProps=", routerProps);
    return <Discussion {...routerProps} />
  }

  render() {

    return (
      <Router>
        <div className="container">

          <Route path="/discussion/:tokenFeedback" render={this.getDiscussion}/>

          <div className="container">
            <a href="/feedback">Page feedback de l'utilisateur</a> ||
            <a href="/dashboard">  Dashboard de l'ingénieur</a> ||
          </div>
            <Route exact path="/feedback" component={Form}/>
            <Route exact path="/testform" component={TestForm} />
            <Route exact path="/about" component={About} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/IP/:id" component={Tchat} />
            <Route exact path="/s/:id" component={Tchat} />
          </div>
      </Router>

    );
  }
}
// <Route path="/chats/:id" component={ChatComponent} />

export default App;
