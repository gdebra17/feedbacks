import React from 'react';
//import { Redirect } from 'react-router';
import './form.css';
import Header from "../header/Header";

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
        decathlonid: "",
        topic: "",
        content: "",
        photo: null,
        username: "",
        mail: "",
      },
      fetchResult: {
        status: null,
        data: null,
        errorMessage: null,
      },
      productName: "",
      redirect: false,
    };
  }

  componentDidMount() {
    document.getElementById("feedbackSuccess").style.display = "none";
    document.getElementById("feedbackFail").style.display = "none";
    document.getElementById("feedbackSubmit").setAttribute("disabled","disabled");
    this.setState({redirect: false});
      fetch("/products")
      .then(response => response.json())
      .then(products => {
        const product = products.find(product => product.decathlonid === this.props.match.params.decathlonid);

        if (product !== undefined) {
          this.setState({form: {...this.state.form, decathlonid: this.props.match.params.decathlonid}, productName: product.name});
        } else {
          alert("The product you try to give a feedback on is not available...");
          //<Redirect to="/" />
        }
      })
    }

  componentDidUpdate() {
    if (this.state.form.content !== "") {
      document.getElementById("feedbackSubmit").removeAttribute("disabled");
    } else {
      document.getElementById("feedbackSubmit").setAttribute("disabled","disabled");
    }
    if (this.state.fetchResult.status === "succeeded") {
      document.getElementById("feedbackSuccess").style.display = "block";
    } else if (this.state.fetchResult.status === "error") {
      document.getElementById("feedbackFail").style.display = "block";
    }
  }

  handleTopic = (event) => {
    this.setState({form: {...this.state.form, topic: event.target.innerText}});
    console.log(event.target);
    console.log(this.state);
  }

  handleFeedback = (event) => {
    this.setState({form: {...this.state.form, content: document.getElementById("feedback").value}});
    console.log(this.state);
  }

  handlePhoto = (event) => {
    this.setState({form: {...this.state.form, photo: event.target.files[0]}});
    console.log(this.state);
  }

  fileUpload(file){
    const formData = new FormData();
    formData.append("file", file);
    return fetch("/upload-file", {
      method: "POST",
      body: formData
    });
  }

  handleName = (event) => {
    //console.log("event.target.value ", event.target.value);
    this.setState({form: {...this.state.form, username: event.target.value}});
  }

  handleMail = (event) => {
    console.log("event.target.value ", event.target.value);
    this.setState({form: {...this.state.form, mail: event.target.value}});
    console.log(this.state);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("decathlonid", this.state.form.decathlonid);
    formData.append("topic", this.state.form.topic);
    formData.append("content", this.state.form.content);
    formData.append("photo", this.state.form.photo);
    formData.append("username", this.state.form.username);
    formData.append("mail", this.state.form.mail);

    fetch("/feedbacks", {
      method: "POST",
      body: formData,
      //headers: { "Content-Type": "application/json" }
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
    this.clearForm();
  }

  clearForm = () => {
    this.setState({form: {
      topic: "",
      content: "",
    }})
    document.getElementById("userform").reset();

    console.log(this.state.form);
  }

  render() {

    return (
      <div className="container">
        <Header />
        <form onSubmit={this.handleSubmit} id="userform">


          <div id="accordion">
            <div className="card mt-3">
              <a className="card-header" id="headingOne" data-toggle="collapse" href="#collapseOne" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <h5 className="mb-0">Concerned bike part - {this.state.productName}</h5>
                <div className="arrowOpen"><img className="arrow" src={arrowDown} alt=""/></div>
                <div className="arrowClose"><img className="arrow" src={arrowUp} alt=""/></div>
              </a>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion" data-toggle="collapse" data-target="#collapseTwo">

                <div className="card-body" onClick={this.handleTopic}>
                  <ul className="list-group">
                    <LineTopic label="Handlebar" activeTopic={this.state.form.topic}/>
                    {/* <LineTopic label="Saddle" activeTopic={this.state.form.topic}/> */}
                    {/* <LineTopic label="Brakes" activeTopic={this.state.form.topic}/> */}
                    <LineTopic label="Frame" activeTopic={this.state.form.topic}/>
                    <LineTopic label="Bicycle drive" activeTopic={this.state.form.topic}/>
                    <LineTopic label="Wheels" activeTopic={this.state.form.topic}/>
                    <LineTopic label="Pedals" activeTopic={this.state.form.topic}/>
                    <LineTopic label="Derailleurs" activeTopic={this.state.form.topic}/>
                    {/* <LineTopic label="Accessories" activeTopic={this.state.form.topic}/> */}

                  </ul>
                </div>

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
                  <textarea onChange={this.handleFeedback} className="form-control" id="feedback" name="feedback" rows="5" required></textarea>
                  <button type="button" id="feedbackSubmit" className="btn btn-outline-primary btn-lg btn-block mt-3" data-toggle="collapse" data-target="#collapseThree">Confirm</button>
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

                <div className="card-body photo mt-3">
                  <input onChange={this.handlePhoto} type="file" id="photo" accept="image/*" />
                </div>
                <div className="card-body photo">
                  <button type="button" className="btn btn-outline-primary btn-lg btn-block mt-3" data-toggle="collapse" data-target="#collapseFour">Upload</button>
                </div>
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
                  <div className="form-group">

                    <input onChange={this.handleName} type="text" className="form-control" id="name" placeholder="Enter your Name" required/>
                    <input onChange={this.handleMail} type="email" className="form-control mt-3" id="mail" placeholder="Enter your email address" required/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    <div className="card-body alert alert-success" role="alert" id="feedbackSuccess">
                      Your feedback was successfully sent straight to the engineer who developed your bike. You can access the <a href={`/su/${this.state.fetchResult.data}`} className="alert-link">dialog page by clicking here</a>!
                    </div>
                    <div className="card-body alert alert-danger" role="alert" id="feedbackFail">
                      Sorry, an error occured. We are working on it, please try again later.
                    </div>
                    <button type="submit" className="btn btn-outline-primary btn-lg btn-block mt-3">Send my feedback !</button>


                  </div>

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
};
