import React, { Component } from 'react';
import { connect } from "react-redux";

import './about.css';
import Navbar from "../navbar/Navbar";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

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
    const { classes } = this.props;

    const stackList = [];
    stackList.push({description: "ReactJs / Redux with Boostrap and Material-UI", image: "/img_react.png"});
    stackList.push({description: "Chat system with WebSocket", image: "/img_websocket.png"});
    stackList.push({description: "Database Postgresql with SQL & ORM Sequelize", image: "/img_postgresql.png"});
    stackList.push({description: "Google identification", image: "/img_google.png"});
    stackList.push({description: "Email management with templating", image: "/img_email.jpeg"});
    stackList.push({description: "Source management with GitHub", image: "/img_github.png"});
    stackList.push({description: "Deployment on Heroku platform", image: "/img_heroku.jpeg"});



    return (

      <div className="{classes.root} mb-5">
        <Navbar />
        <h2 className="mt-5 mb-4 text-center" >Project Informations</h2>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}><h3>Magic Team</h3></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
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
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}><h3>Technical Stack</h3></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
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
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}><h3>Agility Method</h3></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <div className="row mt-3 align-items-center">
                <div className="col">
                  <img src="/img_agile1.jpeg"/>
                </div>
                <div className="col">
                  <img src="/img_agile2.JPG" style={{width:600, height:450}}/>
                </div>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

//export default connect(null, null)(About);

export default withStyles(styles)(About);
