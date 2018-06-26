import React from 'react';
import { Redirect } from 'react-router-dom';
import './connect.css';
import { connect } from "react-redux";
import { getProfileInfo} from "../../store/profile/selectors";
import { profileHandler } from "../../store/profile/handlers";
import { GoogleLogin, GoogleLogout } from 'react-google-login';

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

componentWillMount(){
  // window.location.reload();
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



// responseGoogle = (googleUser) => {
//     const familyName = googleUser.profileObj.familyName;
//     // family = googleUser.profileObj.familyName;
//     const name =googleUser.profileObj.name;
//     const pic =googleUser.profileObj.imageUrl;
//     this.setState({pic: pic})
//     this.setState({name: name})
//     console.log(familyName);
//     console.log(name);
//     console.log(pic);
//
//     this.props.signed(true);
//   }


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
        <div className="jumbotron">
          {/* <img src={backpic} className="img-fluid rounded" alt="..."/> */}
          <div className="mainBody">
          <h1 className="display-5">DECATHLON</h1>

          <div>
          {imagePath
            ?<img className='mt-2 ml-2 connect-photo' src={imagePath} alt=""/>
            :<div/>
          }
            <span className="ml-3">{this.props.profileInfo.U3}</span>
          </div>

          {this.state.checkEmail
            ? <div className="alert alert-danger">{this.state.checkEmail}</div>
            : <span></span>
          }

          <p className="lead mt-3 font-weight-bold">Welcome to Product Feedback App</p>
          <hr className="hr"/>
          {!this.state.checkEmail
            ? <p>Please use the button below to log in and get ready to manage your feedbacks</p>
            : <span></span>
          }
          <div className="lead">

            <div>
            {imagePath
              ? <button title="logout" onClick={disconnect} style={{width:120, height:33}}>Sign Out</button>
              : <div className="g-signin2" data-onsuccess="googleConnectCallback" data-theme="primary"/>
            }
            </div>


        {/* <GoogleLogin
                            className="login"
                            clientId="1067884850483-vhed3duodar5tf92frpf72tanq5juepi.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            />


                            <GoogleLogout
                            className="login"
                            buttonText="Logout"
                            onLogoutSuccess={this.logout}
                            /> */}


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
