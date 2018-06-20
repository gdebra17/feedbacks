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
      .then(data => {
        this.setState({
          feebackToken: data,
        });
      })
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="mt-3">username : <input type="text" id="username" className="form-control" value={this.state.form.username} onChange={this.handleChange}/></div>
          <div className="mt-3">mail : <input type="text" id="mail" className="form-control" value={this.state.form.mail} onChange={this.handleChange}/></div>
          <div className="mt-3">path_image_user : <input type="text" id="path_image_user" className="form-control" value={this.state.form.path_image_user} onChange={this.handleChange}/></div>
          <div className="mt-3">topic : <input type="text" id="topic" className="form-control" value={this.state.form.topic} onChange={this.handleChange}/></div>
          <div className="mt-3">content : <input type="text" id="content" className="form-control" value={this.state.form.content} onChange={this.handleChange}/></div>
          <div className="mt-3">decathlonid : <input type="text" id="decathlonid" className="form-control" value={this.state.form.decathlonid} onChange={this.handleChange}/></div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
        <div className="mt-3">feebackToken : {this.state.feebackToken}</div>
      </div>
    );
  }
}

export default connect(null, null)(TestForm);
