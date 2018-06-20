import React, { Component } from 'react';
import './App.css';
import Form from "./modules/form/form";
import About from "./modules/about/About";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Form />
      </div>
    );
  }
}

export default App;
