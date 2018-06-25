import React, { Component } from "react";
import { Sidebar } from "../../containers/Sidebar";
import { MessagesList } from "../../containers/MessagesList";
import { AddMessage } from "../../containers/AddMessage";
import "../../App.css";
import { closeSocket, openSocket, listenerMessage } from "../../store/sendWs"
import store from "../../store/store"
import {loadDiscussion} from "../../store/sendWs"


const http = require("http");
const Websocket = require("ws");



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
