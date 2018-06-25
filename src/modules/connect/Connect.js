import React from 'react';
import { Redirect } from 'react-router-dom';
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
      checkEmail: "",
      authOk: false,
    }
  }

  logout = (response) => {
  console.log("logout");
  this.props.signed(false);
 }

componentWillReceiveProps(nextProps, nextContext) {
  console.log("componentWillReceiveProps email=", nextProps.profileInfo.U3);
   fetch("/internalconnexion", {
     method: "POST",
     body: JSON.stringify({email: nextProps.profileInfo.U3}),
     headers: { "Content-Type": "application/json" }
   })
     .then(response => response.json())
     .then(result => {
       console.log("componentWillUpdate result=", result);
         if (result.errorMessage) {
           this.setState({
             checkEmail: result.errorMessage,
           });
         } else {
           this.setState({
             authOk: true,
           });
         }
     })
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
      <div className="flex">
      {this.state.authOk
        ?  <Redirect to='/dashboard' />
        :
        <div className="jumbotron mt-2">
          {/* <img src={backpic} className="img-fluid rounded" alt="..."/> */}
          <div className="mainBody">
          <h1 className="display-5">DECATHLON</h1>

          <div>
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
            :<div/>
          }
            <span className="ml-3">{this.props.profileInfo.U3}</span>
          </div>

          <p className="lead mt-3">Welcome to Product Feedback App</p>
          <hr className="hr"/>
          <p>Please use the button below to log in and get ready to manage your feedbacks</p>
          <div className="lead">

            <div>
            {imagePath
              ? <button title="logout" onClick={disconnect} style={{width:120, height:33}}>Sign Out</button>
              : <div className="g-signin2" data-onsuccess="googleConnectCallback" data-theme="primary"/>
            }
            </div>


            {this.state.checkEmail
              ? <div className="alert alert-danger">{this.state.checkEmail}</div>
              : <span></span>
            }
          </div>
        </div>
        </div>
      }
      </div>
    ); //return render
  } //render
}

const Connected = connect(getProfileInfo, profileHandler)(Connect);
export default Connected;
