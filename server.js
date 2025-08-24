import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { v4 as uuid4 } from "uuid";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let onlineUsers = [];

// Add a user
const addUser = (username, socketId) => {
  // Find a user by their username
  const existingUser = onlineUsers.find((user) => user.username === username);

  if (existingUser) {
    // If the user already exists, update their socketId
    existingUser.socketId = socketId;
    console.log(`User '${username}' reconnected, socketId updated.`);
  } else {
    // If it's a new user, add them to the array
    onlineUsers.push({ username, socketId });
    console.log(`User '${username}' added with socketId: ${socketId}`);
  }
};

// Remove a user
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log("User removed");
};
// Find a user
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("newUser", (username) => {
      addUser(username, socket.id);
    });
    socket.on("sendNotification", ({ receiveUsername, data }) => {
      const userMod = receiveUsername.toLowerCase()
      const receiver = getUser(userMod);
      // Check if the user exists before trying to send a notification
      if (receiver) {
        io.to(receiver.socketId).emit("getNotification", {
          id: uuid4(),
          ...data,
        });
      } else {
        console.log(
          `User '${receiveUsername}' not found. Cannot send notification.`
        );
        socket.emit("userOffline", { receiveUsername });
      }
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
