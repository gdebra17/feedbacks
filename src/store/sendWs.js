import store from './store'


// let websocket;
const websocket = new WebSocket(`ws://${window.location.hostname}:8080`);


websocket.addEventListener("message", event => {

  const message = JSON.parse(event.data);
  console.log("Message from server ", message);
  switch (message.type) {
    case "CONNECTION_START":
    default:
      return;
    case "MESSAGES":
    // console.log(`${window.location.pathname} === /c${message.author}`);
    if(window.location.pathname === `/IP${message.author}` || `/IP${window.location.pathname}` === message.author){
      console.log("wow such LKZAJELKJA code", message.data);
      store.dispatch({type: "MESSAGE_RECEIVED", messages: message.data})
      return;
    }
    case "CHANNELS":
      store.dispatch({type: "CHANNELS", channels: message.data})
  }
});

websocket.addEventListener("onopen", event => {

  console.log("plop i've been opened from ", window.location.pathname)

});

function openSocket(){
  console.log("open");
  let websocket = new WebSocket(`ws://localhost:8080`);
}

function closeSocket(){
  websocket.close();
}

function sendLogin(username) {
  websocket.send(
    JSON.stringify({
      type: "LOGIN",
      userName: username
    })
  );
}

function sendMessage(username, channel, message) {
  console.log("I sent a message on : ", websocket.url, " and ", window.location.pathname);
  websocket.send(
    JSON.stringify({
      type: "NEW_MESSAGE",
      userName: username,
      channel: window.location.pathname,
      message: message
    })
  );
}


export default sendLogin;

export {websocket, sendMessage, openSocket, closeSocket};
