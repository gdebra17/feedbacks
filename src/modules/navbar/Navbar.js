import React from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './Navbar.css';
import { connect } from "react-redux";
import { getProfileInfo} from "../../store/profile/selectors";
import { profileHandler } from "../../store/profile/handlers";

let logo = require ("./images/logobtwin.png")




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

    let addressPath;
    if(this.props.profileInfo.U3){
      addressPath = this.props.profileInfo.U3;
    } else {
      addressPath = "";
    }


    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img src={logo} className="img-fluid rounded" alt=""/>

        <div class="btn-group nounderline">
          <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Products List
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Product 1</a>
            <a class="dropdown-item" href="#">Product 2</a>
            <a class="dropdown-item" href="#">Product 3</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">

              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#Modal">
                Add a new product
              </button>



            </a>
          </div>
        </div>







        <a class ="options" href="">Feedbacks</a>


        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">

            {/* <li class="nav-item">
        <a class="nav-link" href="/dashboard/">List of Products</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/feedback/">Feedbacks</a>
      </li> */}

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {imagePath
                  ?<img className='mt-2' src={imagePath} alt="" style={{
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
                  : <a> Your Account </a>
                }
                {addressPath}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">{imagePath
                  ? <button title="logout" onClick={disconnect} style={{width:120, height:33}}>Sign Out</button>
                  : <div className="g-signin2" data-onsuccess="googleConnectCallback" data-theme="primary"/>
                }</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="/about">About us</a>
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
