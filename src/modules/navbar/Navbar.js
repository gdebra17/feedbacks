import React from 'react';
import { Redirect } from 'react-router-dom';
//import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './Navbar.css';
import { connect } from "react-redux";
import { getProfileInfo} from "../../store/profile/selectors";
import { profileHandler } from "../../store/profile/handlers";

let logo = require ("./images/logobtwin.png")

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pic: "",
      checkEmail: "",
      authOk: false,
      productList: [],
      logout: false,
    }
  }

  componentDidMount = () => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => {
        //console.log("componentDidMount productList=", data);
        this.setState({"productList": data});
      })

  }

  logout = (response) => {
    console.log("logout");
    //this.props.signed(false);
    this.props.disconnect();
    this.setState({logout: true});
    window.location.reload();
  }

  render() {
    let imagePath;
    if(this.props.profileInfo.Paa){
      imagePath = this.props.profileInfo.Paa;
    } else {
      imagePath = "";
    }
    // let disconnect = () => {
    //   this.props.disconnect();
    //   window.location.reload();
    // }

    let addressPath = "";
    if(this.props.profileInfo.U3){
      addressPath = this.props.profileInfo.U3;
    }

    return (
      <div className="container">
      {this.state.logout
        ?  <Redirect to='/' />
        :
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

          <div className="logonav">
            <img src={logo} className="img-fluid rounded pr-2 navbar-img-header" alt=""/>
          </div>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav">
              <li className="nav-item dropdown">

                <div className="btn-group">
                  <button type="button" className="btn btn-link dropdown-toggle pr-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Products
                  </button>
                  <div className="dropdown-menu bg-light">
                    {this.state.productList.map((product, index) =>
                      <a key={index} className="dropdown-item" href={"/dashboard/"+product.decathlonid}>{product.name}</a>
                    )}
                    <div className="dropdown-divider"></div>
                    <a key="all" className="dropdown-item" href="/dashboard">Tous les produits</a>

                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="">
                      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#Modal">
                        Add a new product
                      </button>
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {imagePath
                    ?<img className='mt-2 mr-2' src={imagePath} alt="" style={{
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
                    : <span> Your Account </span>
                  }
                  {/* {addressPath} */}
                </a>
              </li>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="">{imagePath
                    ? <button title="logout" onClick={this.logout} style={{width:120, height:33}}>Sign Out</button>
                    : <div className="g-signin2" data-onsuccess="googleConnectCallback" data-theme="primary"/>
                  }</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/about">About project</a>
                </div>
            </ul> */}
          </div>
        </nav>
      }
      </div>

    );
  }
}

const Connected = connect(getProfileInfo, profileHandler)(Navbar);
export default Connected;
