import React from 'react'
import PropTypes from 'prop-types'

const AddMessage = (props) => {
  let input

  return (
    <div>

    <section id="new-message">
    <div className="collapse" id="navbarToggleExternalContent" >
          <div className="bg-light p-4">
            <h5 className="text-dark h4">FEEDBACK RECAP</h5>
            <span className="text-muted">I did not copy and paste this but I also do not own this</span>
          </div>
        </div>
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
      <button style={{marginLeft: 20, padding:5,background: "papayawhip", borderRadius:5}} onClick={() => {
        props.dispatch(input.value, 'Me', window.location.pathname)
        input.value = ''
      }
    }> Send </button>
    <button className="navbar-toggler shadow" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" style={{marginLeft: 15,
          borderStyle:'solid',
          borderColor:'white', height:40, width:80,}}>
            <i>Recap</i>
          </button>
    </section>
    </div>
  )
}

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default AddMessage
