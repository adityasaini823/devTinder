require('dotenv').config();
const connectDb=require('./config/db');
const express = require('express');
const app=express();
const cookieParser = require('cookie-parser');
const cors = require('cors')

connectDb();
//middlewares here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(cors());
//socket code
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

app.set("io", io);
//import Routes here
const authRoutes=require('./routes/auth');
const userRoutes=require("./routes/userRoutes");
const matchRoutes=require("./routes/matchRoutes");
//routes
app.use("",authRoutes);
app.use("/user",userRoutes);
app.use("/match",matchRoutes);

server.listen(3000,()=>{
    console.log('server is running on port 3000');
})