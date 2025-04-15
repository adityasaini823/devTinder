require("dotenv").config();
const connectDb = require("./config/db");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const Message = require("./models/Message");

//database connection
connectDb();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: "http://16.171.249.248",
    credentials: true,
  })
);

//  HTTP server and socket.io instance
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://16.171.249.248",
    credentials: true,
  },
});

// Store online users (userId -> socketId)
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  //  Handle user joining and track their socket ID
  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} connected with socket ${socket.id}`);
  });

  //  Listening for new messages
  socket.on("sendMessage", async (data) => {
    const { sender, receiver, message } = data;
    const conversationId = [sender, receiver].sort().join("_");

    // Save message in the database
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      conversationId,
    });

    // Get receiver's socket ID
    const receiverSocketId = onlineUsers.get(receiver);

    if (receiverSocketId) {
      // Send the message in real-time to the receiver
      io.to(receiverSocketId).emit("receiveMessage", newMessage);
    }
  });

  // Handling user disconnection
  socket.on("disconnect", () => {
    const userId = [...onlineUsers.entries()].find(
      ([, socketId]) => socketId === socket.id
    )?.[0];

    if (userId) {
      onlineUsers.delete(userId);
      console.log(`User ${userId} disconnected`);
    }
  });
});
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
//routes
app.use("", authRoutes);
app.use("/user", userRoutes);
app.use("/match", matchRoutes);
app.use("/chat", require("./routes/chatRoutes"));

// Start server
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
