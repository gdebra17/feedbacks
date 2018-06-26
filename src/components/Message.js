import React from "react"
import PropTypes from "prop-types"
import { Text } from 'react-router-dom';


const Message = ({ message, author, path }) => (
  <p>
    <a> <i style={{fontWeight: "bold"}}>{author}</i>: {message} </a>
  </p>
)
// {
//   `/${path}` === window.location.pathname ? <a>(you) <i style={{fontWeight: "bold"}}>{author}</i> : {message}</a>
//   : <a> <i style={{fontWeight: "bold"}}>{author}</i>: {message} </a>
// }
// {`/${path}`} and {window.location.pathname}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export default Message
