import React, { Component } from "react";
import { Sidebar } from "../../containers/Sidebar";
import { MessagesList } from "../../containers/MessagesList";
import { AddMessage } from "../../containers/AddMessage";
import "../../App.css";
import { closeSocket, openSocket, listenerMessage } from "../../store/sendWs";
import store from "../../store/store";

class Tchat extends Component {

  componentDidMount(){
    // openSocket();

  }

  componentWillUnmount(){
    console.log("beeen on close did unmount");
    closeSocket();
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
