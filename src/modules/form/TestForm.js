import React, { Component } from 'react';
import { connect } from "react-redux";

class TestForm extends Component {
  constructor() {
    super();
    this.state = {
      formFeedback: {
        username: "totof 1",
        mail: "totof1@gmail.com",
        path_image_user: "https://monserver/mypictures.jpg",
        topic: "Brakes",
        content: "I have a little problem with my brakes. Please see my photo.",
        decathlonid: "8377732",
      },
      fetchResultFeedback: {
        status: "xxx",
        data: "xxx",
        errorMessage: "xxx",
      },
      formAddmessage: {
        feedbackToken: "",
        messageContent: "enfin un add message qui marche",
        userToken: "",
      },
      fetchResultAddmessage: {
        status: "yyy",
        data: "yyy",
        errorMessage: "yyy",
      },
    };
    this.handleChangeFeedback = this.handleChangeFeedback.bind(this);
    this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this);
    this.handleChangeAddmessage = this.handleChangeAddmessage.bind(this);
    this.handleSubmitAddmessage = this.handleSubmitAddmessage.bind(this);
  }

  handleChangeFeedback(event) {
    this.setState({
      formFeedback: {...this.state.formFeedback, [event.target.id]: event.target.value}
    });
  }

  handleChangeAddmessage(event) {
    this.setState({
      formAddmessage: {...this.state.formAddmessage, [event.target.id]: event.target.value}
    });
  }

  handleSubmitFeedback(event) {
    event.preventDefault();
    fetch("/feedbacks", {
      method: "POST",
      body: JSON.stringify({...this.state.formFeedback}),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          fetchResultFeedback: {
            status: result.status,
            data: result.data,
            errorMessage: result.errorMessage,
          },
          formAddmessage: {...this.state.formAddmessage, feedbackToken: result.data},
        });
      })
  }

  handleSubmitAddmessage(event) {
    event.preventDefault();
    fetch("/messages", {
      method: "POST",
      body: JSON.stringify({...this.state.formAddmessage}),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          fetchResultAddmessage: {
            status: result.status,
            data: result.data,
            errorMessage: result.errorMessage,
          },
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
          <div className="mt-3">userToken : <input readOnly type="text" id="userToken" className="form-control" value={this.state.formAddmessage.userToken} onChange={this.handleChangeAddmessage}/></div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
        <div>
          <div className="mt-3">fetchResultAddmessage data (messageId): {this.state.fetchResultAddmessage.data.id}</div>
          <div className="mt-3">fetchResultAddmessage status : {this.state.fetchResultAddmessage.status}</div>
          <div className="mt-3">fetchResultAddmessage errorMessage : {this.state.fetchResultAddmessage.errorMessage}</div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(TestForm);
