import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import "./message.css";

const MessagesList = ({messages}) => {
  console.log("messages is: ", messages);
  console.log("this.props: ", this.props);
  return(
  // {loadDiscussion(window.location.pathname)}
  // {props.dispatch(window.location.pathname)}
    <section id="messages-list" >
    <div data-spy="scroll" className="d-flex flex-column">

      {messages.map(message => {
        // console.log("message printed has the following information :", message.path);
        // console.log("message printed has the following information :", window.location.pathname);
        if(message.path === window.location.pathname){
        return (
          <div className=" d-flex justify-content-end">
          <Message
            key={message.id}
            {...message}
            myStyle="messageLeft"
            textColor="text-white"
          />
        </div>
        )
      } else {
          return(<div className=" d-flex">
                    <Message
                      key={message.id}
                      {...message}
                      myStyle="messageOther"
                      textColor = "text-dark"
                    />
                  </div>
                )
              }
            }
      )}
      </div>
    </section>
  );
}


MessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      messages: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}


export default MessagesList;
