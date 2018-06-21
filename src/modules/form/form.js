import React from 'react';
import ReactDOM from 'react-dom';
import './form.css';
import Header from "../header/header";
const arrowDown = require ("./images/down2.png");
const arrowUp = require ("./images/up2.png");


function LineTopic(props) {
  let currentStyle = "list-group-item list-group-item-action";
  if (props.activeTopic === props.label) {
    currentStyle = currentStyle + " active";
  }
  return (
    <li className={currentStyle}>{props.label}</li>
  )
}

export default class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        decathlonid: "8377732",
        topic: "",
        feedback: "",
        photo: null,
        username: "",
        mail: "",
      },
      fetchResult: {
        status: null,
        data: null,
        errorMessage: null,
      }
    };
  }

  handleTopic = (event) => {
    this.setState({topic: event.target.innerText})
    console.log(event.target);
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

  handleName = (event) => {
    console.log("event.target.value ", event.target.value);
    this.setState({username: event.target.value});
  }

  handleMail = (event) => {
    console.log("event.target.value ", event.target.value);
    this.setState({mail: event.target.value});
  }


  handleSubmit = (event) => {

    event.preventDefault();

    fetch("/feedbacks", {
      method: "POST",
      body: JSON.stringify({...this.state.form}),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({
          fetchResult: {
            status: result.status,
            data: result.data,
            errorMessage: result.errorMessage,
          }
        });
      })
  }



  render() {


    return (
      <div className="container">
        <Header />
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
                <LineTopic label="Handlebar" activeTopic={this.state.topic}/>
                <LineTopic label="Saddle" activeTopic={this.state.topic}/>
                <LineTopic label="Brakes" activeTopic={this.state.topic}/>
                <LineTopic label="Frame" activeTopic={this.state.topic}/>
                <LineTopic label="Bicycle drive" activeTopic={this.state.topic}/>
                <LineTopic label="Wheels" activeTopic={this.state.topic}/>
                <LineTopic label="Pedals" activeTopic={this.state.topic}/>
                <LineTopic label="Derailleurs" activeTopic={this.state.topic}/>
                <LineTopic label="Accessories" activeTopic={this.state.topic}/>

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
              <input type="submit" className="btn btn-outline-primary btn-lg btn-block mt-3" value="Upload" />

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
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input onChange={this.handleName} type="text" className="form-control" id="name" placeholder="Enter your Name"/>
                </div>
                <div className="form-group">
                  <input onChange={this.handleMail} type="email" className="form-control" id="mail" placeholder="Enter your email address"/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button type="submit" onKeyPress={this.handleSubmit} className="btn btn-outline-primary btn-lg btn-block mt-3">Send my feedback !</button>
              </form>
            </div>
          </div>
        </div>
      </div>
            </div>
    )
  }
};
