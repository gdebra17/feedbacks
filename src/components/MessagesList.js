import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";


const MessagesList = ({messages}) => (
  // console.log("messages is: ", messages);
  // return(
  // {loadDiscussion(window.location.pathname)}
  // {props.dispatch(window.location.pathname)}
    <section id="messages-list" >
    <div data-spy="scroll">
      {}
      {messages.map(message => {
        console.log("message printed has the following information :", message)
        return (
          <Message
          key={message.id}
          {...message}
          />
        )
      })}
      </div>
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
