import React from 'react';
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
              <button type="button" className="btn btn-outline-primary btn-file">
                <input type="file" accept="image/*" capture="camera" name="file-input"/>
              </button>
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
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
      </div>
    )
  }


};
