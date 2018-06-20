import React, { Component } from 'react';
import { connect } from "react-redux";
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
          <Link to="/chats"> Click HERE to go to Chats</Link>
        </span>
      </div>
    );
  }
}

export default Buttons
