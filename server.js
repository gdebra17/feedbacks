const express = require("express");
const path = require("path");
const Websocket = require("ws");
const http = require("http");

const handlers = require("./handlers/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });
}

const app = express();
app.use("/static", express.static("./build/static"));
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));


app.get("/welcome", handlers.getWelcome);

//http://localhost:8080/feedbacks/TOKEN_2
app.get("/feedbacks/:token/", handlers.getFeedbackByToken);
app.post("/feedbacks", handlers.postNewFeedback);

app.get("*", (request, result)=>{
  result.sendFile(path.resolve("./build/index.html"));
});

const port = process.env.PORT || 8080;

const server = http.createServer();
const wss = new Websocket.Server({server});

const users = []

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN && client !== ws) {
      // client.send(JSON.stringify(data))
      client.send(JSON.stringify({ type: data.type, data: data.message, author: data.author}));
      // console.log("data is : ", data);
      // console.log("Client is : ", client.send);

    }
  })
}

wss.on('connection', (ws) => {
  let index
  console.log("ws here is : ", ws.on);
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
        console.log("message added")
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

  // ws.on('close', () => {
  //   users.splice(index, 1)
  //   broadcast({
  //     type: 'USERS_LIST',
  //     users
  //   }, ws)
  // })
  
})

server.on("request", app);

server.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
