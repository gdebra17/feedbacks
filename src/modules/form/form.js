import React from 'react';
import ReactDOM from 'react-dom';

export default class Form extends React.Component {
  render() {
    return (
      <div id="accordion">
        <div class="card mt-3">
          <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            <h5 class="mb-0">
                Concerned bike part
            </h5>
          </div>

          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item list-group-item-action">Handlebar</li>
                <li class="list-group-item list-group-item-action">Saddle</li>
                <li class="list-group-item list-group-item-action">Brakes</li>
                <li class="list-group-item list-group-item-action">Frame/Fork</li>
                <li class="list-group-item list-group-item-action">Bicycle drive</li>
                <li class="list-group-item list-group-item-action">Wheels</li>
                <li class="list-group-item list-group-item-action">Pedals</li>
                <li class="list-group-item list-group-item-action">Derailleurs</li>
                <li class="list-group-item list-group-item-action">Accessories</li>
                </ul>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <h5 class="mb-0">
                Your improvement idea
            </h5>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
            <div class="card-body">
              <textarea class="form-control" id="formcontrol1" rows="5"></textarea>
              <button type="button" class="btn btn-outline-primary btn-lg btn-block mt-3">Confirm</button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            <h5 class="mb-0">
                Upload a picture
            </h5>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
            <div class="card-body">
              <button type="button" class="btn btn-outline-primary btn-file">
                <input type="file" accept="image/*" capture="camera" name="file-input"/>
              </button>
              <div class="input-group mb-3">
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="inputGroupFile02" />
                  <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                </div>
                <div class="input-group-append">
                  <span class="input-group-text" id="">Upload</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header" id="headingFour" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            <h5 class="mb-0">
                Send your feedback !
            </h5>
          </div>
          <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
      </div>
    )
  }
};
