import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// import TestForm from "./modules/form/TestForm";
// import About from "./modules/about/About";
// import Discussion from "./modules/Tchat/Discussion";
// import Buttons from "./modules/Buttons";

import Form from "./modules/form/Form";
import Dashboard from "./modules/dashboard/Dashboard";
import Connect from "./modules/connect/Connect";
import Tchat from "./modules/Tchat/Tchat";
import Tchat0 from "./modules/Tchat/Tchat0";
import Navbar from "./modules/navbar/Navbar";

class App extends Component {

  postFeedback = (routerProps) => {
    console.log("routerProps=", routerProps);
    return <Form {...routerProps} />
  }

  render() {

    return (
      <Router>
        <div className="container">
          {/* <div className="container">
            <a href="/feedback">Page feedback de l'utilisateur</a> ||
            <a href="/dashboard">  Dashboard de l'ingénieur</a> ||
          </div> */}

          <Route exact path="/" component={Connect}/>
          <Route path="/connect" component={Connect}/>
          <Route path="/postfeedback/:decathlonid" render={this.postFeedback}/>
          <Route path="/IP/:tokenFeedback" component={Tchat}/>
          <Route path="/SP/:tokenFeedback" component={Tchat0}/>

          {/* <Route exact path="/testform" component={TestForm} />
          <Route exact path="/about" component={About} /> */}
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/navbar" component={Navbar}/>


          </div>

      </Router>

    );
  }
}
// <Route exact path="/ip/:tokenUser/:tokenFeedback" component={Tchat} />
// <Route exact path="/s/:tokenFeedback" component={Tchat} />
// <Route path="/chats/:id" component={ChatComponent} />

export default App;
