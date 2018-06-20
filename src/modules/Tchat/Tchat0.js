import React, { Component } from "react";
import { Sidebar } from "../../containers/Sidebar";
import { MessagesList } from "../../containers/MessagesList";
import { AddMessage } from "../../containers/AddMessage";
import "../../App.css";
import store from "../../store/store"

const http = require("http");
const Websocket = require("ws");



class Tchat extends Component {

  componentDidMount(){
    const ws = new WebSocket("ws://localhost:8080");

    ws.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      console.log("Message from server ", message.data);
      switch (message.type) {
        case "CONNECTION_START":
        default:
          return;
        case "MESSAGES":
        console.log("wow such code");
          store.dispatch({type: "MESSAGE_RECEIVED", message: `You received this from the server, from "${message.author}" the following : "${message.data}"`})
          return;
        case "CHANNELS":
          store.dispatch({type: "CHANNELS", channels: message.data})
      }
    });
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
