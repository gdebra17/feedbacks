const express = require("express");
const path = require("path");
const Websocket = require("ws");
const feedbacksService = require("./services/feedbacksService");
const http = require("http");
const usersService = require("./services/usersService");
const cors = require("cors");
const handlers = require("./handlers/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });
}

const app = express();
app.use("/static", express.static("./build/static"));
app.use("/uploads", express.static("./uploads"));
app.use(express.static("./build"));
app.use(cors());
app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));

app.get("/welcome", handlers.getWelcome);

//http://localhost:8080/feedbacks/TOKEN_2
app.get("/feedbacks/:token/", handlers.getFeedbackByToken);
app.post("/feedbacks", handlers.postNewFeedback);
app.get("/feedbackList/:decathlonid", handlers.getFeedbackList);
app.get("/feedbackList", handlers.getFeedbackList);
app.post("/messages", handlers.postNewMessage);
//app.post("/messages/:idtoken", handlers.getAllMessages);
app.get("/products", handlers.getAllProducts);
app.get("/sendMails", handlers.sendMails);
app.post("/newproduct", handlers.postNewProduct);
app.post("/internalconnexion", handlers.getInternalConnexion);

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
    // console.log(client.readyState === ws.OPEN, client !== ws);
    // console.log("data from broadcast :", data);
    // if (client.readyState === ws.OPEN && client !== ws) {
      // console.log("data is : ", );
      client.send(JSON.stringify({ type: data.type, data: data.message, author: data.author, users: data.users, userId: data.name}));
      // console.log("Client is : ", client.send);
    // }
  })
}

// let list = handlers.getFeedbackList();

wss.on('connection', (ws) => {
  // console.log("wss information", wss);
  // console.log("ws information", ws);
  let tokenList = [];

  feedbacksService.getFeedbackList()
  .then(feedbackList => {
    feedbackList.forEach(feedback => {
      // console.log("feeedback has : ", feedback);
      tokenList.push({id:feedback.token, topic:feedback.topic, decatId: feedback.decathlonid, name: feedback.name})
    })
    return tokenList})
  .then((tokenList) => {
    ws.send(JSON.stringify({
    type: "USERS_LIST",
    users: tokenList
    }));
    broadcast({
      type: 'USERS_LIST',
      users: tokenList
    }, ws)
  });

  // let messageList = [];

  feedbacksService.getAllMessage()
  .then(messageList =>
    messageList.forEach( message => {
      //console.log("message added : ", message);
      usersService.getNameByUserId(message.user_id)
      .then(userName => {
        // console.log("userName :", userName);
        return {type: userName.type, name:userName.name}})
      .then(userName => {
        if(userName.type === "CUSTOMER"){
          // console.log("been here niggas");
          ws.send(JSON.stringify({
            type: 'MESSAGES',
            data: message.content,
            userId: userName.name,
            author: `/su/${message.token}`
          }));
          broadcast({
            type: 'MESSAGES',
            userId: userName.name,
            data: message.content,
            author: `/su/${message.token}`
          }, ws);
        } else {
          ws.send(JSON.stringify({
            type: 'MESSAGES',
            data: message.content,
            userId: userName.name,
            author: `/pe/${message.token}`
          }));
          broadcast({
            type: 'MESSAGES',
            userId: userName.name,
            data: message.content,
            author: `/pe/${message.token}`
          }, ws);
        }
      })
    })
  );



  // console.log("address is :",`${window.location.pathname}`);
  let userID = `lambda${i}`
  ws.id = userID;
  webSockets[userID] = ws
  i++;
  // console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(webSockets))
  // console.log("ws id is : ", ws.id)
  // let socketTry = new Websocket("http:/")
  let index
  ws.onopen = (event) => {
    // console.log("logged in with the event : ", event)
  }

  ws.onmessage = (event) => {
    // console.log("been here", event.data);

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
        //console.log("message added : ", data.channel.substring(4))
        let feedbackToken;
        let userToken;
        let messageContent = data.message;
        if(data.channel.charAt(1) === "p"){
          feedbackToken = data.channel.substring(4);
          userToken = feedbackToken;

          // console.log("ip userToken is : ", userToken);

          usersService.getIPByFeedbackToken(feedbackToken)
          // .then(result => console.log("result from IPByToken is : ", result))
          .then(result => {
            let actualUserId = result[0].token;
            // console.log("actualUserId is : ", actualUserId);
            feedbacksService.getFeedbackHeaderByToken(feedbackToken)
            .then(feedbackHeader => {
              // console.log("handlers/postNewMessage:", feedbackHeader);
              if (actualUserId) {
                // console.log("handlers/postNewMessage: message is added by actualUserId", actualUserId);
                return usersService.getUserHeaderByToken(actualUserId).
                then(dbUser => {
                  // console.log("dbUser is :" , dbUser);
                  return {feedbackId: feedbackHeader.id, userId: dbUser.id};
                })
              } else {
                //console.log("handlers/postNewMessage: message is added by feedback creator", feedbackHeader.user_id);
                return {feedbackId: feedbackHeader.id, userId: feedbackHeader.user_id};
              }
            })
            .then(data => {
              usersService.getNameByUserId(data.userId)
              .then(name => { return name.name })
              .then(name => {
                // console.log("result is : ", name);
                broadcast({
                  type: 'MESSAGES',
                  message: messageContent,
                  author: `/pe/${userToken}`,
                  name,
                }, ws)})
              return data;
            })
            .then(data => {
              //console.log("handlers/postNewMessage: insert data=", data);
              return feedbacksService.addNewMessageToFeedback(data.feedbackId, messageContent, data.userId)
            })
            .then(infos => {
              if (infos.errorMessage) {
                result.json({status: "error", errorMessage: infos.errorMessage});
              } else {
                // result.json({status: "succeeded", data: infos});
              }
            })
          })

        } else {
          feedbackToken = data.channel.substring(4);
          let userToken = feedbackToken;

          usersService.getUserByFeedbackToken(feedbackToken)
          .then(result => {
            let actualUserId = result[0].token;
            // console.log("actualUserId is : ", actualUserId);
            feedbacksService.getFeedbackHeaderByToken(feedbackToken)
            .then(feedbackHeader => {
              // console.log("handlers/postNewMessage:", feedbackHeader);
              if (actualUserId) {
                // console.log("handlers/postNewMessage: message is added by actualUserId", actualUserId);
                return usersService.getUserHeaderByToken(actualUserId).
                then(dbUser => {
                  // console.log("dbUser is :" , dbUser);
                  return {feedbackId: feedbackHeader.id, userId: dbUser.id};
                })
              } else {
                //console.log("handlers/postNewMessage: message is added by feedback creator", feedbackHeader.user_id);
                return {feedbackId: feedbackHeader.id, userId: feedbackHeader.user_id};
              }
            })
            .then(data => {
              usersService.getNameByUserId(data.userId)
              .then(name => { return name.name })
              .then(name => {
                // console.log("result is : ", name);
                broadcast({
                  type: 'MESSAGES',
                  message: messageContent,
                  author: `/su/${userToken}`,
                  name,
                }, ws)})
              return data;
            })
            .then(data => {
              // console.log("handlers/postNewMessage: insert data=", data);
              return feedbacksService.addNewMessageToFeedback(data.feedbackId, messageContent, data.userId)
            })
            .then(infos => {
              if (infos.errorMessage) {
                result.json({status: "error", errorMessage: infos.errorMessage});
              } else {
                result.json({status: "succeeded", data: infos});
              }
            })
          })
        }
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
