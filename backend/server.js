import express from "express";
import dotenv from "dotenv";
import currencyRoute from "./routes/currencyPrice.js";
// import exchangeRoute from "./routes/exchangePrice.js";
import cors from "cors";
import path from "path";
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors({
  // origin: "http://localhost:5173",
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use('/api',currencyRoute);
// app.use('/api/exchange/', exchangeRoute);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:5173",
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// socket.io 연결
io.on('connection', (socket) => {

  // 유저 연결
  console.log(`User Connected: ${socket.id}`);
  socket.emit("user_id", socket.id);

  // 연결된 유저 수 
  const connectedClients = io.engine.clientsCount;
  console.log(connectedClients);

  // client로 부터 send_message를 받았을 때
  socket.on("send_message", (messageFromClient) => {
    console.log(messageFromClient);
    // client로 부터 받은 메세지 다시 전달.
    io.emit('chat_message', {username: messageFromClient.username, message :messageFromClient.message})
  });
});

// 배포 환경
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Sever Listening on Port: ${PORT}`);
})
