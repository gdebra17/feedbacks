import React from "react"
import PropTypes from "prop-types"
import Message from "./Message"


const MessagesList = ({messages}) => (
  // console.log("messages is: ", messages);
  // return(
    <section id="messages-list">
      <ul>
      {messages.map(message => (
        <Message
        key={message.id}
        {...message}
        />
      ))}
      </ul>
    </section>
  // );
)

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      messages: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export default MessagesList
