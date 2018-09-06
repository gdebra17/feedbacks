import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileInfo} from "../../store/profile/selectors";
import { profileHandler } from "../../store/profile/handlers";
import { Sidebar } from "../../containers/Sidebar";
import { MessagesList } from "../../containers/MessagesList";
import { AddMessage } from "../../containers/AddMessage";
import Navbar from "../navbar/Navbar";
import "../../App.css";
import { closeSocket } from "../../store/sendWs"
import {Link} from "react-router-dom"
let imageExists = require('image-exists');

let loginFlag = false;

class Tchat extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginFlag: "loading",
    }
  }


  // componentWillMount(){
  //
  //
  //   let gapiImg = "https://accounts.google.com/CheckCookie?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&chtml=LoginDoneHtml&checkedDomains=youtube&checkConnection=youtube%3A291%3A1";
  //   imageExists(gapiImg, (exists) => {
  //     if (exists) {
  //       this.setState({loginFlag:true});
  //       // this.setState({currentIPConnected:this.props.profileInfo.ofa});
  //       // console.log("it's alive!", loginFlag);
  //
  //     } else {
  //       this.setState({loginFlag:false});
  //       // console.log("oh well", loginFlag);
  //     }
  //   });
  // }

  componentWillUnmount(){
    console.log("beeen on close did unmount");
    closeSocket();
  }

  show_login_status(network, status)
  {
    console.log("status is : ", status);
   if (status)
   {
    alert("Logged in to " + network);
   }else{
    alert("Not logged in to " + network);
   }
  }

  render() {
    return (
      <div>
        <Navbar />
        {
          (this.props.email === this.props.profileInfo.U3 && this.props.IP === "IP")
          ? <div className="container">
            <div id="container">
              <Sidebar />
              <section id="main">
                <MessagesList />
                <AddMessage />
              </section>
            </div>
          </div>
          : <div className="container">
            <h1> Are you sure you are logged in ? </h1>
            <div> You can connect on <Link to="/connect"><bold>THIS</bold></Link> page </div>
          </div>
        }
      </div>

    );
  }
}

const Connected = connect(getProfileInfo, profileHandler)(Tchat);
export default Connected;
// export default Tchat;
