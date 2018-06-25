import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './connect.css';

//let backpic = require ("./images/test.jpg")


export default class Connect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pic: "",

    }
  }

  // getLoginStatus(){
  //   let { loggedIn } = this.props;
  //   return {
  //   loggedIn: loggedIn
  //     }
  //   }


  responseGoogle = (googleUser) => {
    const familyName = googleUser.profileObj.familyName;
    // family = googleUser.profileObj.familyName;
    const name =googleUser.profileObj.name;
    const pic =googleUser.profileObj.imageUrl;
    const email =googleUser.profileObj.email;
    this.setState({pic: pic})
    this.setState({name: name})
    console.log(familyName);
    console.log(name);
    console.log(pic);
    console.log(email);
    this.props.signed(true);
  }

  logout = (response) => {
  console.log("logout");
  // this.props.signed(false);
}


  render() {
    return (

    <div className="flex">
      <div className="jumbotron mt-2">
        {/* <img src={backpic} className="img-fluid rounded" alt="..."/> */}
        <div className="mainBody">
        <h1 className="display-5">DECATHLON</h1>
        <p className="lead">Welcome to Product Feedback App</p>
      <hr className="hr"/>
        <p>Please use the button below to log in and get ready to get your first feedbacks</p>
        <p className="lead">
          <GoogleLogin
            className="loginBtn loginBtn--google"
            clientId="1067884850483-vhed3duodar5tf92frpf72tanq5juepi.apps.googleusercontent.com"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />

          <GoogleLogout
            className="signin"
            buttonText="Logout"
            onLogoutSuccess={this.logout}
          />
        </p>
      </div>
      </div>

    </div>

    );
  }
}
