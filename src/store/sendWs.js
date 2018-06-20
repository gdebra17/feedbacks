import store from './store'

const websocket = new WebSocket(`ws://localhost:8080`);

websocket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  console.log("Message from server ", message);
  switch (message.type) {
    case "CONNECTION_START":
    default:
      return;
    case "MESSAGES":
    console.log("wow such code");
      store.dispatch({type: "ADD_MESSAGE", messages: message.data})
      return;
    case "CHANNELS":
      store.dispatch({type: "CHANNELS", channels: message.data})
  }
});

function sendLogin(username) {
  websocket.send(
    JSON.stringify({
      type: "LOGIN",
      userName: username
    })
  );
}

function sendMessage(username, channel, message) {
  websocket.send(
    JSON.stringify({
      type: "NEW_MESSAGE",
      userName: username,
      channel: channel,
      message: message
    })
  );
}


export default sendLogin;

export {sendMessage};
