import React from 'react';
import Header from "../header/Header";
import "./dashboard.css";

export default class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        productsList: [],
        feedbacks: [],
        productName: "",
        productDecathlonId: "",
        expiringDate: "",
        user_id: 0,
      };
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

  console.log("event.target.value ", event.target.value);

  this.setState({expiringDate: event.target.value})
//   const now = new Date().toJSON().slice(0,10);
//   const monthsNow = now.slice(5,7);
//   const months = this.state.expiringDate.slice(5,7);
//   const withinM = `${months - monthsNow} months and `;
//   const daysNow = now.slice(8,10);
//   const days = this.state.expiringDate.slice(8,10);
//   const withinD = `${days - daysNow} days`;
// console.log(withinD);
// console.log(withinM);
}

getProductsList = () => {
  fetch("http://localhost:8080/products")
        .catch((error) => {
          console.warn(error);
        })
        .then((response) => response.json())
        .then((resp) => {
          this.setState({"productsList": resp})
          //console.log("Liste des produits ", this.state.productsList);
        })
}

getFeedbacks = () => {
  fetch("http://localhost:8080/feedbackList")
        .catch((error) => {
          console.warn(error);
        })
        .then((response) => response.json())
        .then((resp) => {
          this.setState({"feedbacks": resp})
          //console.log(this.state.feedbacks);
        })
}

postNewProduct = () => {
  console.log("decathlon id reconnu ? ", this.state.productDecathlonId);
  fetch("http://localhost:8080/newproduct", {
    method: "POST",
    body: JSON.stringify({name: this.state.productName, decathlonid: this.state.productDecathlonId, expiringdate: this.state.expiringDate, user_id: this.state.username}),
    headers: {
    'content-type': 'application/json'
    }
  })
        .catch((error) => {
          console.warn(error);
        })
        .then((response) => console.log(response))
}

  render() {
    return (
      <div>
        <div className="container">
          <Header />
          <div className="text-center p-3">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#Modal">
              Add a new product
            </button>
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
                    <label className="col-sm-12 col-form-label">The QR Code will expire within {this.withinM}{this.withinD}.</label>
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
                <li className="list-group-item d-flex font-weight-bold flex-center align-items-center">Products under review...</li>
                {this.state.productsList.map(product => <li key={product.decathlonid} className="list-group-item d-flex justify-content-between align-items-center text-uppercase">
                  <small>{product.name}</small>
                  <footer className="blockquote-footer">{product.decathlonid}</footer>
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
                    <h5 className="card-title">{feed.topic}</h5>
                    <p className="card-text">Card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">{feed.name}</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
