import React from "react";
import PropTypes from "prop-types";
import "./message.css"

const Message = ({ id, message, author, path, myStyle, textColor}) => (
  <span className={`${myStyle} ${textColor} border border-dark rounded`}>
    <b>{author}</b>: {message}
  </span>
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

export default Message;
