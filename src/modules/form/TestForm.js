import React, { Component } from 'react';
import { connect } from "react-redux";

class TestForm extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        username: "totof 1",
        mail: "totof1@gmail.com",
        path_image_user: "https://monserver/mypictures.jpg",
        topic: "Brakes",
        content: "I have a little problem with my brakes. Please see my photo.",
        decathlonid: "8377732",
      },
      fetchResult: {
        status: "xxx",
        data: "xxx",
        errorMessage: "xxx",
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      form: {...this.state.form, [event.target.id]: event.target.value}
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch("/feedbacks", {
      method: "POST",
      body: JSON.stringify({...this.state.form}),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => {
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

        <form onSubmit={this.handleSubmitFeedback}>
          <div className="mt-3">username : <input type="text" id="username" className="form-control" value={this.state.formFeedback.username} onChange={this.handleChangeFeedback}/></div>
          <div className="mt-3">mail : <input type="text" id="mail" className="form-control" value={this.state.formFeedback.mail} onChange={this.handleChangeFeedback}/></div>
          <div className="mt-3">path_image_user : <input type="text" id="path_image_user" className="form-control" value={this.state.formFeedback.path_image_user} onChange={this.handleChangeFeedback}/></div>
          <div className="mt-3">topic : <input type="text" id="topic" className="form-control" value={this.state.formFeedback.topic} onChange={this.handleChangeFeedback}/></div>
          <div className="mt-3">content : <input type="text" id="content" className="form-control" value={this.state.formFeedback.content} onChange={this.handleChangeFeedback}/></div>
          <div className="mt-3">decathlonid : <input type="text" id="decathlonid" className="form-control" value={this.state.formFeedback.decathlonid} onChange={this.handleChangeFeedback}/></div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
        <div>
          <div className="mt-3">fetchResultFeedback data (feedbackToken) : {this.state.fetchResultFeedback.data}</div>
          <div className="mt-3">fetchResultFeedback status : {this.state.fetchResultFeedback.status}</div>
          <div className="mt-3">fetchResultFeedback errorMessage : {this.state.fetchResultFeedback.errorMessage}</div>
        </div>

        <form className="mt-5" onSubmit={this.handleSubmitAddmessage}>
          <div className="mt-3">feedbackToken : <input type="text" id="feedbackToken" className="form-control" value={this.state.formAddmessage.feedbackToken} onChange={this.handleChangeAddmessage}/></div>
          <div className="mt-3">messageContent : <input type="text" id="messageContent" className="form-control" value={this.state.formAddmessage.messageContent} onChange={this.handleChangeAddmessage}/></div>
          <div className="mt-3">userToken : <input type="text" id="userToken" className="form-control" value={this.state.formAddmessage.userToken} onChange={this.handleChangeAddmessage}/></div>

          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
        <div className="mt-3">fetchResult data (feedbackToken) : {this.state.fetchResult.data}</div>
        <div className="mt-3">fetchResult status : {this.state.fetchResult.status}</div>
        <div className="mt-3">fetchResult errorMessage : {this.state.fetchResult.errorMessage}</div>
      </div>
    );
  }
}

export default connect(null, null)(TestForm);
