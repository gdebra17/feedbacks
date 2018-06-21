import React from 'react';
import ReactDOM from 'react-dom';
import './header.css';
let test2 = require ("./images/test2.png")

export default class Header extends React.Component {
  render() {
    return (
      <div className="mainHeader">
        <img className="test" src={test2} alt="" className="responsive rounded"/>
      </div>
    );
  }
}
