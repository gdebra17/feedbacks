import React from 'react';
import ReactDOM from 'react-dom';
import './form.css';
const arrowDown = require ("./images/down2.png");
const arrowUp = require ("./images/up2.png");

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      decathlonid: "8377732",
      topic: "",
      feedback: "",
      photo: null,
      username: "",
      mail: "",
    };
  }

  handleTopic = (event) => {
    this.setState({topic: event.target.innerText})
    console.log(this.state);
  }

  handleFeedback = (event) => {
    this.setState({feedback: document.getElementById("feedback").value})
    console.log(this.state);
  }

  handlePhoto = (event) => {
    this.setState({photo: event.target.files[0]})
    console.log(this.state);
  }

  fileUpload(file){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("random_value", "42");
    return fetch("/upload-file", {
      method: "POST",
      body: formData
    });
  }

  handleSubmitPhoto = (event) => {
    event.preventDefault();
    this.fileUpload(this.state.photo)
      .then(response => console.log(response.json()))

  }

  handleSubmit = (event) => {
    console.log("event ", event);
    console.log("event.target ", event.target);
    console.log("event.target.value ", event.target.value);
    // this.setState({topic: event.target.value})
  }


  render() {
    return (
      <div id="accordion">
        <div className="card mt-3">
          <a className="card-header" id="headingOne" data-toggle="collapse" href="#collapseOne" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <h5 className="mb-0">Concerned bike part</h5>
            <div className="arrowOpen"><img className="arrow" src={arrowDown} alt=""/></div>
            <div className="arrowClose"><img className="arrow" src={arrowUp} alt=""/></div>
          </a>

          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion" data-toggle="collapse" data-target="#collapseTwo">
            <form onClick={this.handleTopic}>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item list-group-item-action">Handlebar</li>
                <li className="list-group-item list-group-item-action">Saddle</li>
                <li className="list-group-item list-group-item-action">Brakes</li>
                <li className="list-group-item list-group-item-action">Frame/Fork</li>
                <li className="list-group-item list-group-item-action">Bicycle drive</li>
                <li className="list-group-item list-group-item-action">Wheels</li>
                <li className="list-group-item list-group-item-action">Pedals</li>
                <li className="list-group-item list-group-item-action">Derailleurs</li>
                <li className="list-group-item list-group-item-action">Accessories</li>
              </ul>
            </div>
            </form>
          </div>
        </div>
        <div className="card">
          <a className="card-header" id="headingTwo" data-toggle="collapse" href="#collapseTwo" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <h5 className="mb-0">Your improvement idea</h5>
            <div className="arrowOpen"><img className="arrow" src={arrowDown} alt=""/></div>
            <div className="arrowClose"><img className="arrow" src={arrowUp} alt=""/></div>
          </a>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">

            <div className="card-body">
              <form>
                <textarea className="form-control" id="feedback" rows="5"></textarea>
                <button type="button" onClick={this.handleFeedback} className="btn btn-outline-primary btn-lg btn-block mt-3" data-toggle="collapse" data-target="#collapseThree">Confirm</button>
              </form>
            </div>

          </div>
        </div>
        <div className="card">
          <a className="card-header" id="headingThree" data-toggle="collapse" href="#collapseThree" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <h5 className="mb-0">
                Upload a picture
            </h5>
            <div className="arrowOpen"><img className="arrow" src={arrowDown} alt=""/></div>
            <div className="arrowClose"><img className="arrow" src={arrowUp} alt=""/></div>
          </a>

          <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">

            <form onSubmit={this.handleSubmitPhoto}>
            <div className="card-body photo">
              <input onChange={this.handlePhoto} type="file" accept="image/*" />
            </div>
            <div className="card-body nav justify-content-center">
              <input type="submit" value="Upload" />

            </div>
            </form>
          </div>
        </div>
        <div className="card">
          <a className="card-header" id="headingFour" data-toggle="collapse" href="#collapseFour" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            <h5 className="mb-0">
                Send your feedback !
            </h5>
            <div className="arrowOpen"><img className="arrow" src={arrowDown} alt=""/></div>
            <div className="arrowClose"><img className="arrow" src={arrowUp} alt=""/></div>
          </a>
          <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
            <div className="card-body">

              <form>

                <div className="form-group">
                  <input type="text" className="form-control" id="exampleInputName" placeholder="Enter your Name"/>
                </div>

                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail" placeholder="Enter your email address"/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button type="submit" className="btn btn-outline-primary btn-lg btn-block mt-3">Send my feedback !</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }


};
