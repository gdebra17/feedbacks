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
      },
      feedbackDate: ""
    };
  }

  componentDidMount() {
    fetch("/feedbacks/"+this.state.token, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(feedbackDetail => {
        // console.log("feedbackDetail :", feedbackDetail);
        const uploadUrlList = [];
        feedbackDetail.messages.forEach(message => {
          message.uploads.forEach(upload => {
            uploadUrlList.push(process.env.REACT_APP_UPLOAD_URL + upload.pathUpload);
          });
        });
        //console.log("uploadUrlList=", uploadUrlList);
        this.setState({
          uploadUrlList: uploadUrlList,
          feedbackDetail: feedbackDetail,
          feedbackDate: feedbackDetail.messages[0].createdDate
        });
      });
  }

  formatDate = (oneDate) => {
    // console.log("oneDate", oneDate);
    const feedbackDate = new Date(oneDate);
    let day = feedbackDate.getDate();
    let month = feedbackDate.getMonth();
    const year = feedbackDate.getFullYear();
    let fullDay = (day < 10) ? `0${day}`: day;
    let fullMonth = (month < 10) ? `0${month}`: month;
    return `${fullDay}/${fullMonth}/${year}`;
  }

  render() {
    let input;



    return (
      <div className="container">

        <section id="new-message">
          <div className="collapse" id="navbarToggleExternalContent" >
            <div className="bg-light p-4">
              <h5 className="text-dark"><b>Feedback Summary</b></h5>
              {/* {console.log("this.state", this.state.feedbackDetail)} */}
              <span className="text-muted">{this.state.feedbackDetail.header.product.name} ({this.state.feedbackDetail.header.product.decathlonid}) - {this.formatDate(this.state.feedbackDate)}</span>
              {this.state.uploadUrlList.map(url =>
                <div>
                  <img src={url} style={{maxHeight: 250}} alt=""/>
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-outline-info m-2" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" style={{marginLeft: 15,
              borderStyle:'thin',
              borderColor:'black', height:35,}}>
              <a>See the feedback infos</a>
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
              className="inputText ml-2"
              ref={(node) => {
                input = node
              }}
            />

            <button className="btn btn-outline-primary m-2" type="button"  style={{marginLeft: 15,
              borderStyle:'thin',
              borderColor:'black', height:35,}}
              onClick={() => {
                this.props.dispatch(input.value, 'Me', window.location.pathname)
                input.value = ''
              }
            }>Send</button>
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
