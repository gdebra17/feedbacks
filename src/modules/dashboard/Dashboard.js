import React from 'react';
import Navbar from "../navbar/Navbar";
import { connect } from "react-redux";
import { getProfileInfo} from "../../store/profile/selectors";
import { profileHandler } from "../../store/profile/handlers";
import "./dashboard.css";
const QRCode = require('qrcode-react');


class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        qrcode: {
          value: `${window.location.origin}/postfeedback/`,
          size: 128,
          fgColor: '#000000',
          bgColor: '#ffffff',
          level: 'L',
          renderAs: 'svg',
        },
        productsList: [],
        feedbacks: [],
        productName: "",
        productDecathlonId: "",
        expiringDate: "",
        displayQrCode: [],
        decathlonidSelected: this.props.match.params.decathlonid,
      };
      //this.displayQrcode = this.displayQrcode.bind(this);
    }



setExpiringDate = () => {
  let today = new Date();
  today.setMonth(today.getMonth() + 3);
  today = today.toJSON().slice(0,10);
  // console.log(today);
  this.setState({expiringDate: today});
}

onClose = () => {
  document.getElementById("newProduct").reset();
}

componentDidMount = () => {
  this.getProductsList();
  this.getFeedbacks();
  this.setExpiringDate();
}

handleProductName = (event) => {
  this.setState({productName: event.target.value})
}

handleProductDecathlonId = (event) => {
  this.setState({productDecathlonId: event.target.value})
}

handleExpiringDate = (event) => {
  // console.log("event.target.value ", event.target.value);
  this.setState({expiringDate: event.target.value})
}

getProductsList = () => {
  fetch("/products")
        .catch((error) => {
          console.warn(error);
        })
        .then((response) => response.json())
        .then((resp) => {
          this.setState({"productsList": resp})
          // console.log("Liste des produits ", this.state.productsList);
        })
}

getFeedbacks = () => {
  let url = "/feedbackList/";
  if (this.state.decathlonidSelected) {
    url += this.state.decathlonidSelected;
  } else {
    url += "ALL";
  }
  fetch(url)
        .catch((error) => {
          console.warn(error);
        })
        .then((response) => response.json())
        .then((resp) => {
          this.setState({"feedbacks": resp})
          // this.props.storeFeedbacksList(resp)
          // console.log("resp ", resp);
        })

}

postNewProduct = () => {
  fetch("/newproduct", {
    method: "POST",
    body: JSON.stringify({name: this.state.productName, decathlonid: this.state.productDecathlonId, expiringdate: this.state.expiringDate, user_id: this.props.id}),
    headers: {
    'content-type': 'application/json'
    }
  })
    .catch((error) => {
      console.warn(error);
    })
    .then((response) => {
      console.log("Response New Product", response)
    })
}

formatDate = (oneDate) => {
  const feedbackDate = new Date(oneDate);
  let day = feedbackDate.getDate();
  let month = feedbackDate.getMonth() + 1;
  const year = feedbackDate.getFullYear();
  let fullDay = (day < 10) ? `0${day}`: day;
  let fullMonth = (month < 10) ? `0${month}`: month;
  return `${fullDay}/${fullMonth}/${year}`;
}

displayQrcode = (itemToManage) => {
  //console.log("displayQrcode: itemToManage=", itemToManage);
  if (this.state.displayQrCode.includes(itemToManage)) {
    const displayQrCodeWithoutItem = this.state.displayQrCode.filter(item => item !== itemToManage);
    this.setState({displayQrCode: [...displayQrCodeWithoutItem]});
  } else {
    this.setState({displayQrCode: [...this.state.displayQrCode, itemToManage]});
  }
}

  render() {
    return (
      <div>
        <Navbar />
        {
        (this.props.email === this.props.profileInfo.U3 && this.props.IP === "IP")
        ? <div className="container">
          <div className="text-center p-3">
            <div className="modal fade" id="Modal" tabIndex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add a new product to follow up</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form onSubmit={this.postNewProduct} id="newProduct">
                    <div className="form-group row mt-2">
                      <label className="col-sm-5 col-form-label">Product name</label>
                      <div className="col-sm-7">
                        <input className="newProd text-uppercase" onChange={this.handleProductName} name="name" type="text" required/>
                      </div>
                    </div>
                    <div className="form-group row mt-2">
                      <label className="col-sm-5 col-form-label">Generic article code</label>
                      <div className="col-sm-7">
                        <input className="newProd" onChange={this.handleProductDecathlonId} name="decathlonid" type="text" maxLength="7" required/>
                      </div>
                    </div>
                    <div className="form-group row mt-2">
                      <label className="col-sm-5 col-form-label">Expiring date</label>
                      <div className="col-sm-7">
                        <input className="newProdexpiringDate" onChange={this.handleExpiringDate} value={this.state.expiringDate} id="expiringDate" type="date"/>
                      </div>
                      {/* <label className="col-sm-12 col-form-label">The QR Code will expire within {this.withinM}{this.withinD}.</label> */}
                    </div>
                    <div className="modal-footer">
                      <button type="button" onClick={this.onClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-primary">Add product</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <ul className="list-group">
                { this.state.decathlonidSelected === undefined
                  ? <li className="list-group-item d-flex font-weight-bold flex-center align-items-center">Products under review...</li>
                  : <span></span>
                }
                {this.state.productsList.filter(product => !this.state.decathlonidSelected || product.decathlonid === this.state.decathlonidSelected)
                  .map(product =>
                    <li  key={product.decathlonid} onClick={() => this.displayQrcode(product.decathlonid)} className="list-group-item d-flex justify-content-between align-items-center text-uppercase">
                      <div className="container">
                        <div className="row Qrcode list-group-item-action" >
                          <div className="col-8">
                            <small>{product.name}</small>
                          </div>
                          <div className="col-2">
                            <i className="fas fa-barcode fa-2x"></i>
                          </div>
                          <div className="col-2">
                            <small>{product.decathlonid}</small>
                          </div>
                        </div>
                        <div className="row justify-content-center " >
                          { this.state.displayQrCode.includes(product.decathlonid)
                            ? <div id="idQRcode" className=" mt-3 mb-3">
                              <a href={"/postfeedback/" + product.decathlonid} target="_blank">
                              <QRCode
                                value={`${this.state.qrcode.value}${product.decathlonid}`}
                                size={this.state.qrcode.size}
                                fgColor={this.state.qrcode.fgColor}
                                bgColor={this.state.qrcode.bgColor}
                                level={this.state.qrcode.level}
                                renderAs={this.state.qrcode.renderAs}
                              />
                            </a>
                          </div>
                          : <span></span>
                        }
                      </div>
                    </div>
                  </li>)}
                </ul>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="container pt-5">
              <div className="card-columns">
                {this.state.feedbacks.map(feed =>
                  <div className="card" key={feed.token}>
                    <div className="card-body">
                      <h5 className="card-title">{feed.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{feed.topic} - {this.formatDate(feed.created_at)}</h6>
                      <p className="card-text">{feed.content}</p>
                      <div className="d-flex justify-content-around">
                        <a href={`/pe/${feed.product_id}/${feed.token}`}><button type="button" className="btn btn-outline-primary btn-sm">User thread</button></a>
                        <a href={`/dashboard/${feed.decathlonid}`}><button type="button" className="btn btn-outline-secondary btn-sm">Product info</button></a>
                      </div>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">{feed.decathlonid} - {
                        this.state.productsList.filter(prod => prod.decathlonid === feed.decathlonid)
                        .map(prod => <span key={prod.decathlonid}>{prod.name}</span>)
                      }</small>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>

        : <div className="container">
            <h1>Are you sure you are logged in?</h1>
            <h1>Or have the right to access this page?</h1>
            <div>You can sign in above, on the top right-hand corner.</div>
          </div>
      }


        </div>
      );
    }
  }

const Connected = connect(getProfileInfo, profileHandler)(Dashboard);
export default Connected;
// export default Dashboard;
