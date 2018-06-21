import React from 'react';
import ReactDOM from 'react-dom';
import './form.css';

export default class Form extends React.Component {


  render() {
    return (
      <div id="accordion">
        <div className="card mt-3">
          <a className="card-header" id="headingOne" data-toggle="collapse" href="#collapseOne" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <h5 className="mb-0">Concerned bike part</h5>
            <div className="arrowOpen"><img className="arrow" src="/images/down2.png" alt=""/></div>
            <div className="arrowClose"><img className="arrow" src="/images/up2.png" alt=""/></div>
          </a>

          <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion" data-toggle="collapse" data-target="#collapseTwo">
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item list-group-item-action">Handlebar</li>
                <li className="list-group-item list-group-item-action">Saddle</li>
                <li className="list-group-item list-group-item-action">Brakes</li>
                <li className="list-group-item list-group-item-action">Frame/Fork</li>
                <li className="list-group-item list-group-item-action">Bicycle drive</li>
                <li className="list-group-item list-group-item-action">Wheels</li>
                <li className="list-group-item list-group-item-action">Pedals</li>
                <li className="list-group-item list-group-item-action">Derailleurs</li>
                <li className="list-group-item list-group-item-action">Accessories</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <a className="card-header" id="headingTwo" data-toggle="collapse" href="#collapseTwo" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <h5 className="mb-0">Your improvement idea</h5>
            <div className="arrowOpen"><img className="arrow" src="/images/down2.png" alt=""/></div>
            <div className="arrowClose"><img className="arrow" src="/images/up2.png" alt=""/></div>
          </a>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            <div className="card-body">
              <textarea className="form-control" id="formcontrol1" rows="5"></textarea>
              <button type="button" className="btn btn-outline-primary btn-lg btn-block mt-3" data-toggle="collapse" data-target="#collapseThree">Confirm</button>


            </div>
          </div>
        </div>
        <div className="card">
          <a className="card-header" id="headingThree" data-toggle="collapse" href="#collapseThree" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <h5 className="mb-0">
                Upload a picture
            </h5>
            <div className="arrowOpen"><img className="arrow" src="/images/down2.png" alt=""/></div>
            <div className="arrowClose"><img className="arrow" src="/images/up2.png" alt=""/></div>
          </a>

          <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
            <div className="card-body">
              <button type="button" className="btn btn-outline-primary btn-file btn-sm">
              <input type="file" accept="image/*" capture="camera" name="file-input"/>
              </button>
              {/* <div className="input-group mb-3">
  <div className="custom-file">
    <input type="file" className="custom-file-input" id="inputGroupFile02" />
    <label className="custom-file-label" for="inputGroupFile02">Choose file</label>
  </div>
  <div className="input-group-append">
    <span className="input-group-text" id="">Upload</span>
  </div> */}
            {/* </div> */}
            </div>
          </div>
        </div>
        <div className="card">
          <a className="card-header" id="headingFour" data-toggle="collapse" href="#collapseFour" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            <h5 className="mb-0">
                Send your feedback !
            </h5>
            <div className="arrowOpen"><img className="arrow" src="/images/down2.png" alt=""/></div>
            <div className="arrowClose"><img className="arrow" src="/images/up2.png" alt=""/></div>
          </a>
          <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
            <div className="card-body">

              <form>

                <div className="form-group">
                  <input type="text" className="form-control" id="exampleInputName" placeholder="Enter your Name"/>
                </div>

                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail" placeholder="Enter your email address"/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button type="submit" className="btn btn-outline-primary btn-lg btn-block mt-3">Send my feedback !</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }


};
