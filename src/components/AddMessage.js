import React from 'react'
import PropTypes from 'prop-types'

const AddMessage = (props) => {
  let input

  return (
    <div className="container">

      <section id="new-message">
        <div className="collapse" id="navbarToggleExternalContent" >
          <div className="bg-light p-4">
            <h5 className="text-dark h4">FEEDBACK RECAP</h5>
            <span className="text-muted">I did not copy and paste this but I also do not own this</span>
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
                props.dispatch(input.value, 'Me', window.location.pathname)
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
              props.dispatch(input.value, 'Me', window.location.pathname)
              input.value = ''
            }
          }> Send </button>
        </div>


      </section>
    </div>
  )
}

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default AddMessage
