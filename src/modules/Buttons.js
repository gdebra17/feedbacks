import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Buttons extends Component {
  render() {
    return (
      <div className="container">
        <h2 className="mt-4 mb-4 text-center" >TESTING MINITEL CENTER</h2>
        <span className="input-group-btn primary">
          <Link to="/">Click HERE to go to Form </Link>
        </span>
        <span> || </span>
        <span className="input-group-btn">
          <Link to="/chats"> to Chats</Link>
        </span>
        <span> || </span>
        <span className="input-group-btn">
          <Link to="/testform">to TestForm</Link>
        </span>
        <span className="input-group-btn">
          <span> || </span>
          <Link to="/connect">to Connect</Link>
        </span>
      </div>
    );
  }
}

export default Buttons
