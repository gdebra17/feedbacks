import React, { Component } from "react";
import { Sidebar } from "../../containers/Sidebar";
import { MessagesList } from "../../containers/MessagesList";
import { AddMessage } from "../../containers/AddMessage";
import "../../App.css";
import { closeSocket } from "../../store/sendWs";

class Tchat extends Component {

  componentDidMount(){
    // console.log("I did update")
    // loadDiscussion(window.location.pathname);
  }

  componentWillUnmount(){
    console.log("beeen on close did unmount");
    closeSocket();
  }

  render() {
    return (
      <div id="container">
        <h1>IP</h1>
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
