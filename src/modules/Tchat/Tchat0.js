import React, { Component } from "react";
import { MessagesList } from "../../containers/MessagesList";
import { AddMessage } from "../../containers/AddMessage";
import "../../App.css";
import { closeSocket } from "../../store/sendWs"

class Tchat extends Component {

  componentDidMount(){
    // console.log("I did update")
    // loadDiscussion(window.location.pathname);

  }

  componentWillUnmount(){
    console.log("beeen on close did unmount");
    closeSocket();
  }

  // <Sidebar />
  render() {
    return (
      <div id="container">
        <section id="main">
        <h1>SPORTIF</h1>

          <MessagesList />
          <AddMessage />
        </section>
      </div>
    );
  }
}

export default Tchat;
