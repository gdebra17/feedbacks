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

wss.on("connection", (ws) => {
  console.log("HELLO");
});

server.on("request", app);

server.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});
