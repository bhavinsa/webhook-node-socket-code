//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var path = require("path");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
global.basePath = __dirname + "/";
//Express
var app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.set("port", process.env.PORT || 2000);
app.use(bodyParser.json());
app.use(express.static(path.join(basePath, "public")));

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get("/", function(req, res) {
  res.sendFile(basePath + "index.html");
});
app.use("/api", require(basePath + "api"));

var server = http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});

//Socket
global.io = require("socket.io")(server, {
  "close timeout": 30
});

global.userList = {};
global.socketList = {};

var socket = require(basePath + "socket.js");
socket.connection(io);
