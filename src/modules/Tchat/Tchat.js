import React, { Component } from "react";
import { Sidebar } from "../../containers/Sidebar";
import { MessagesList } from "../../containers/MessagesList";
import { AddMessage } from "../../containers/AddMessage";
import "../../App.css";


class Tchat extends Component {

  componentDidMount(){
    const ws = new WebSocket("ws://localhost:8080");
    console.log(ws);
  }

  render() {
    return (
      <div id="container">
        <Sidebar />
        <section id="main">
          <MessagesList />
          <AddMessage />
        </section>
      </div>
    );
  }
}

export default Tchat;
