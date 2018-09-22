//Dependencies
var express = require("express");
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();

router.post("/data", function(req, res) {
  console.log(userList[req.body.userid]);
  if (userList[req.body.userid] != undefined) {
    io.to(userList[req.body.userid]).emit("message", req.body.message);
    res.send({
      status: true,
      message: "Data sent successfully"
    });
  } else {
    res.send({
      status: true,
      message: "User is not valid"
    });
  }
});
module.exports = router;
