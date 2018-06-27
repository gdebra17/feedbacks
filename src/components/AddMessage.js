import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddMessage extends Component {
  constructor() {
    super();
    this.state = {
      token: window.location.pathname.substring(4),
      uploadUrlList: [],
      feedbackDetail: {
        header: {product: ""},
        messages: []
      }
    };
  }

  componentWillMount() {
    fetch("/feedbacks/"+this.state.token, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(feedbackDetail => {
        //console.log("feedbackDetail :", feedbackDetail);
        const uploadUrlList = [];
        feedbackDetail.messages.forEach(message => {
          message.uploads.forEach(upload => {
            uploadUrlList.push(process.env.REACT_APP_UPLOAD_URL + upload.pathUpload);
          });
        });
        //console.log("uploadUrlList=", uploadUrlList);
        this.setState({
          uploadUrlList: uploadUrlList,
          feedbackDetail: feedbackDetail
        });
      });
  }

  render() {
    let input;



    return (
      <div className="container">

        <section id="new-message">
          <div className="collapse" id="navbarToggleExternalContent" >
            <div className="bg-light p-4">
              <h5 className="text-dark h4">FEEDBACK RECAP</h5>
              {console.log("this.state", this.state.feedbackDetail.header)}
              <span className="text-muted">Product: {this.state.feedbackDetail.header.product.name} ({this.state.feedbackDetail.header.product.decathlonid})</span>
              {this.state.uploadUrlList.map(url =>
                <div>
                  <img src={url} style={{maxHeight: 250}}/>
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-outline-info m-2" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" style={{marginLeft: 15,
              borderStyle:'thin',
              borderColor:'black', height:35, width:80,}}>
              <a>Recap</a>
            </button>
          </div>
          <div className="col-12">
            <input
              onKeyPress={(e) => {
                if (e.key === 'Enter' && (input.value !== null)) {
                  this.props.dispatch(input.value, 'Me', window.location.pathname)
                  input.value = ''
                }
              }}
              type="text"
              ref={(node) => {
                input = node
              }}
            />

            <button className="btn btn-outline-primary m-2" type="button"  style={{marginLeft: 15,
              borderStyle:'thin',
              borderColor:'black', height:35, width:80}}
              onClick={() => {
                this.props.dispatch(input.value, 'Me', window.location.pathname)
                input.value = ''
              }
            }> Send </button>
          </div>
        </section>
      </div>
    )
  }
}

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default AddMessage
