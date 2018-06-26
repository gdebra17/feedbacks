import React, { Component } from 'react';
import { connect } from "react-redux";

import './about.css';

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
        console.log("data :", data);
        this.setState({
          teamName: data.teamName,
          creatorList: data.creatorList,
        })
      });
  }

  render() {

    const stackList = [];
    stackList.push({description: "ReactJs - Redux with Boostrap", image: "/img_react.png"});
    stackList.push({description: "Chat system with WebSocket", image: "/img_websocket.png"});
    stackList.push({description: "Database Postgresql with SQL & ORM Sequelize", image: "/img_postgresql.png"});
    stackList.push({description: "Google identification", image: "/img_google.png"});
    stackList.push({description: "Email management with templating", image: "/img_email.jpeg"});
    stackList.push({description: "Source management with GitHub", image: "/img_github.png"});
    stackList.push({description: "Deployment on Heroku platform", image: "/img_heroku.jpeg"});
    


    return (
      <div className="container mb-5">
        <h2 className="mt-4 mb-4 text-center" >Magic Team</h2>
        {this.state.creatorList.map(creator =>
            <div className="row mt-3 align-items-center" key={creator.id}>
              <div className="col-12 col-md-4">
                <img className="about-photo" src={creator.urlPhoto}/>
                <span className="ml-3">{creator.name}</span>
              </div>
              <div className="col-12 col-md-4"><span>{creator.description}</span></div>
              <div className="col-12 col-md-4"><span>{creator.email}</span></div>

            </div>
          )
        }

        <h2 className="mt-5 mb-4 text-center" >Technical Stack</h2>
        {stackList.map((stack,index) =>
            <div className="row mt-3 align-items-center" key={index}>
              <div className="col-3 col-md-4">
                <img className="about-photo" src={stack.image}/>
              </div>
              <div className="col-8 col-md-8">
                <span>{stack.description}</span>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(null, null)(About);
