import React from 'react';
import Header from "../header/Header";

export default class Dashboard extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        productsList: [],
        feedbacks: [],
        productName: "",
        productDecathlonId: "",
      };
    }

componentDidMount = () => {
  this.getProductsList();
  this.getFeedbacks();
}

handleProductName = (event) => {
  this.setState({productName: event.target.value})
}

handleProductDecathlonId = (event) => {
  this.setState({productDecathlonId: event.target.value})
}

getProductsList = () => {
  fetch("http://localhost:8080/products")
        .catch((error) => {
          console.warn(error);
        })
        .then((response) => response.json())
        .then((resp) => {
          this.setState({"productsList": resp})
          //console.log(this.state.productsList);
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
          console.log(this.state.feedbacks);
        })
}

postNewProduct = () => {
  fetch("http://localhost:8080/newproduct", {
    method: "POST",
    body: JSON.stringify({name: this.state.productName, decathlonid: this.state.productDecathlonId}),
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
                  <form onSubmit={this.postNewProduct}>
                    <div className="modal-body">
                      <input onChange={this.handleProductName} name="name" type="text"/>
                      <input onChange={this.handleProductDecathlonId} name="decathlonid" type="text"/>

                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                {this.state.productsList.map(product => <li key={product.decathlonId} className="list-group-item d-flex justify-content-between align-items-center">
                  <small>{product.name}</small>
                  <footer className="blockquote-footer">{product.decathlonId}</footer>
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
