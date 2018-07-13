import store from './store';

const host = window.location.origin.replace(/^https/, 'wss');

let websocket;

// (process.env.NOVE_ENV === 'development')
// ? websocket = new WebSocket("ws://localhost:8080")
// : websocket = new WebSocket(`${host}`);

// const websocket = new WebSocket("ws://localhost:8080");
const websocket = new WebSocket(`${host}`);

websocket.addEventListener("message", event => {

  const message = JSON.parse(event.data);
  //console.log("Message from server ", message);
  switch (message.type) {
    case "CONNECTION_START":
    default:
      return;
    case "MESSAGES":
    // console.log(`check this equality : ${window.location.pathname.substring(2)} === ${message.author.substring(3)}`);
    // console.log(`check this equality : ${window.location.pathname.substring(3)} === ${message.author.substring(2)}`);
    // console.log(`check this equality : ${window.location.pathname.substring(3)} === ${message.author.substring(3)}`);
    // if(event.data.id !== undefined){
      if(window.location.pathname.substring(3) === `${message.author.substring(2)}` || `${window.location.pathname.substring(2)}` === message.author.substring(3) || `${window.location.pathname.substring(3)}` === message.author.substring(3)){
        //console.log("wow such LKZAJELKJA code", message);
        store.dispatch({type: "MESSAGE_RECEIVED", messages: message.data, author: message.userId, path: message.author})
        return;
      }
      else {return}
    // }
    case "CHANNELS":
      store.dispatch({type: "CHANNELS", channels: message.data})
      /* falls through */
    case "USERS_LIST":
      //console.log("been here with user_list", message);
      store.dispatch({type: "USERS_LIST", users: message.users})
  }
});

websocket.addEventListener("onopen", event => {

  console.log("plop i've been opened from ", window.location.pathname)

});

function openSocket(){
  // websocket.send(
  //   JSON.stringify({
  //     type: "OPENING",
  //     userName: username
  //   })
  // );
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

function loadDiscussion(urlToken){
  console.log(`I will load this discussion : ${urlToken}`);
  websocket.send(
    JSON.stringify({
      type: "LOAD_DISCUSSION",
      path: urlToken
    })
  )
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

export {websocket, sendMessage, openSocket, closeSocket, loadDiscussion};
