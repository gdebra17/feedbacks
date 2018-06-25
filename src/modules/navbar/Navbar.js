import React from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './Navbar.css';
import { connect } from "react-redux";
import { getProfileInfo} from "../../store/profile/selectors";
import { profileHandler } from "../../store/profile/handlers";




class Connect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pic: "",
      checkEmail: "",
      authOk: false,
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


    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Product Feedback</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {imagePath
                  ? <button title="logout" onClick={disconnect} style={{width:120, height:33}}>Sign Out</button>
                  : <div className="g-signin2" data-onsuccess="googleConnectCallback" data-theme="primary"/>
                }
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>


    );
  }
}

const Connected = connect(getProfileInfo, profileHandler)(Connect);
export default Connected;
