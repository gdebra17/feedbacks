import React, { Component } from "react";
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

  // <Sidebar />
  render() {
    // fetch("https://accounts.google.com/CheckCookie?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&chtml=LoginDoneHtml&checkedDomains=youtube&checkConnection=youtube%3A291%3A1").then((result) => console.log("info here is :", result)).catch(console.log)
    return (
      <div className="container mt-3">
        <h4>Welcome back! Here is the chatroom with the engineer...</h4>
        <p><i>Feel free to tell more or even to ask questions about the product. Thanks again!</i></p>
        <MessagesList />
        <AddMessage />
      </div>
    );
  }
}

export default Tchat;
