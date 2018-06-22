import React from 'react';
import './header.css';
let triban100 = require ("./images/triban100hor.jpg")

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img src={triban100} className="img-fluid rounded" alt="..."/>
      </div>
    );
  }
}
