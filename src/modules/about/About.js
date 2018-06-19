import React, { Component } from 'react';
import { connect } from "react-redux";

class About extends Component {
  constructor() {
    super();
    this.state = {
      teamName: "",
      creatorList : [],
    };
  }

  componentWillMount() {
    fetch("/welcome", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        //console.log("data :", data);
        this.setState({
          teamName: data.teamName,
          creatorList: data.creatorList,
        })
      });
  }

  render() {
    return (
      <div className="container">
        <h2 className="mt-4 mb-4 text-center" >{this.state.teamName}</h2>
        {this.state.creatorList.map(creator =>
            <div className="row mt-1" key={creator.id}>
              <div className="col-6">{creator.name}</div>
              <div className="col-6">{creator.email}</div>
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(null, null)(About);
