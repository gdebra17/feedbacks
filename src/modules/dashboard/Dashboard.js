import React from 'react';
import Header from "../header/Header";

export default class Dashboard extends React.Component {


  render() {
    return (
      <div className="container">
        <Header />
        <div className="text-center p-3">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#Modal">
              Add a new product
            </button>


            <div className="modal fade" id="Modal" tabindex="-1" role="dialog" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add a new product to follow up</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form onSubmit="">
                  <div className="modal-body">
                      <input type="text"/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Add product</button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <ul className="list-group">
                <li className="list-group-item d-flex font-weight-bold flex-center align-items-center">Your products under review...</li>
                <li className="list-group-item d-flex justify-content-between align-items-center">Triban 100 UK</li>
                <li className="list-group-item d-flex justify-content-between align-items-center">Triban 100 ES</li>
                <li className="list-group-item d-flex justify-content-between align-items-center">Triban 300</li>
              </ul>
            </div>
            <div className="col-2"></div>


        </div>

      </div>
    );
  }
}
