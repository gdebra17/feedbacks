import React, { Component } from "react";



class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailFeedback: {messages: []},
    }
  }

  componentWillMount() {
    fetch("/feedbacks/"+this.props.match.params.tokenFeedback, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        console.log("data :", data);
        this.setState({
          detailFeedback: data,
        })
      });
  }

  render() {
    return (
      <div id="container">
        {this.state.detailFeedback.messages.map(message => {
            return <div className="row mt-3">{message.body}</div>;
          })
        }
      </div>
    );
  }
}

export default Discussion;
