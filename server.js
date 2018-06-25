const express = require("express");
const path = require("path");
const Websocket = require("ws");
const http = require("http");
const cors = require("cors");
const handlers = require("./handlers/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });
}

const app = express();
app.use("/static", express.static("./build/static"));
app.use("/uploads", express.static("./uploads"));
app.use(cors());
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));

app.get("/welcome", handlers.getWelcome);

//http://localhost:8080/feedbacks/TOKEN_2
app.get("/feedbacks/:token/", handlers.getFeedbackByToken);
app.post("/feedbacks", handlers.postNewFeedback);
app.get("/feedbackList", handlers.getFeedbackList);
app.post("/messages", handlers.postNewMessage);
//app.post("/messages/:idtoken", handlers.getAllMessages);
app.get("/products", handlers.getAllProducts);
app.get("/sendMails", handlers.sendMails);
app.post("/newproduct", handlers.postNewProduct);

app.get("*", (request, result)=>{
  result.sendFile(path.resolve("./build/index.html"));
});

const port = process.env.PORT || 8080;

const server = http.createServer();
const wss = new Websocket.Server({server, "clientTracking":true});
let webSockets = {} // userID: webSocket
let i = 1000;


const clientSockets = [];
const ipSockets = [];

const broadcast = (data, ws) => {
  // console.log("list of clients from wss: ", wss.clients);
  wss.clients.forEach((client) => {
    // console.log("client is :", ws);
    console.log(client.readyState === ws.OPEN, client !== ws);
    if (client.readyState === ws.OPEN && client !== ws) {
      // console.log("data is : ", );
      client.send(JSON.stringify({ type: data.type, data: data.message, author: data.author}));
      // console.log("Client is : ", client.send);
    }
  })
}


wss.on('connection', (ws) => {
  // console.log("address is :",`${window.location.pathname}`);
  let userID = `lambda${i}`
  ws.id = userID;
  webSockets[userID] = ws
  i++;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(webSockets))
  console.log("ws id is : ", ws.id)
  // let socketTry = new Websocket("http:/")
  let index
  ws.onopen = () => {
    console.log("logged in with the event : ", event)
  }

  ws.onmessage = (event) => {
    console.log("been here", event.data);

    const data = JSON.parse(event.data)

    switch (data.type) {
      case 'ADD_USER': {
        index = users.length
        users.push({ name: data.name, id: index + 1 })
        ws.send(JSON.stringify({
          type: 'USERS_LIST',
          users
        }))
        broadcast({
          type: 'USERS_LIST',
          users
        }, ws)
        break
      }
      case 'NEW_MESSAGE':
        console.log("message added : ", data)
        broadcast({
          type: 'MESSAGES',
          message: data.message,
          author: data.userName
        }, ws)
        break
      default:
        break
    }
  }

  ws.on('close', () => {

  })

  ws.on("error", console.warn);
})

server.on("request", app);

server.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
