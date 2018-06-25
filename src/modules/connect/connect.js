import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './connect.css';
import { connect } from "react-redux";
import { getProfileInfo} from "../../store/profile/selectors";
import { profileHandler } from "../../store/profile/handlers";

let backpic = require ("./images/test.jpg")


class Connect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pic: "",

    }
  }


  logout = (response) => {
  console.log("logout");
  this.props.signed(false);
}


  render() {

    let imagePath;
    if(this.props.profileInfo.Paa){
      imagePath = this.props.profileInfo.Paa;
    } else {
      imagePath = "";
    }
    let disconnect = () => {
      this.props.disconnect();
      window.location.reload();
    }

    console.log("--------------", imagePath);

    return (

    <div className="flex">
      <div className="jumbotron mt-2">
        {/* <img src={backpic} className="img-fluid rounded" alt="..."/> */}
        <div className="mainBody">
        <h1 className="display-5">DECATHLON</h1>
        <p className="lead">Welcome to Product Feedback App</p>
      <hr className="hr"/>
        <p>Please use the button below to log in and get ready to get your first feedbacks</p>
        <div className="lead">
          {/* <GoogleLogin
            className="loginBtn loginBtn--google"
            clientId="1067884850483-vhed3duodar5tf92frpf72tanq5juepi.apps.googleusercontent.com"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          /> */}

          <div>
          {imagePath
            ? <button title="logout" onClick={disconnect} style={{width:120, height:33}}>Sign Out</button>
            : <div className="g-signin2" data-onsuccess="googleConnectCallback" data-theme="primary"/>
          }
          </div>

        <div>
          {imagePath
            ?<img src={imagePath} alt="" style={{
               borderWidth:1,
               borderStyle:'solid',
               borderColor:'white',
               alignItems:'center',
               paddingLeft:1,
               marginLeft: 40,
               justifyContent:'center',
               width:50,
               height:50,
               backgroundColor:'#fff',
               borderRadius:100,
             }}/>
             :<div/>
           }

           {this.props.profileInfo.U3}
         </div>

        </div>
      </div>
      </div>

    </div>

    );
  }
}

const Connected = connect(getProfileInfo, profileHandler)(Connect);
export default Connected;
