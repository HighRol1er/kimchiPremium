import express from "express";
import currencyRoute from "./routes/currencyPrice.js";
import exchangeRoute from "./routes/exchangePrice.js";
import cors from "cors";
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const PORT = 3010;

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use('/api',currencyRoute);
app.use('/api/exchange/', exchangeRoute);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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


server.listen(PORT, () => {
  console.log(`Sever Listening on Port: ${PORT}`);
})
