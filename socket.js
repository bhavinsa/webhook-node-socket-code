//connection
exports.connection = function(io) {
  io.sockets.on("connection", function(socket) {
    //join
    socket.on("join", function(data) {
      userList[data] = socket.id;
      socketList[socket.id] = data;
      console.log(userList);
      console.log(socketList);
      socket.emit("joined", "You are joined.");
    });

    socket.on("reconnect", function(socket) {
      //join
      console.log("@@@ -  reconnect");
      delete userList[data];
      delete socketList[socket.id];
      userList[data] = socket.id;
      socketList[socket.id] = data;
      console.log(userList);
      console.log(socketList);
    });

    socket.on("disconnect", function(data) {
      console.log("@@@ - disconnect");

      delete userList[data];
      delete socketList[socket.id];

      console.log(userList);
      console.log(socketList);
    });
  });
};
