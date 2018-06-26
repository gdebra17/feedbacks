import React, { Component } from "react";
import { MessagesList } from "../../containers/MessagesList";
import { AddMessage } from "../../containers/AddMessage";
import "../../App.css";
import { closeSocket, openSocket, listenerMessage } from "../../store/sendWs"
import store from "../../store/store"
import {loadDiscussion} from "../../store/sendWs"

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
      <div>
      <h1>SPORTIF</h1>
        <MessagesList />
        <AddMessage />
      </div>
    );
  }
}

export default Tchat;
