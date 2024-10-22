import express from "express";
import currencyRoute from "./routes/currencyPrice.js";
import cors from "cors";
// import { createServer } from 'http';
// import { Server } from 'socket.io';

const app = express();
const PORT = 3010;

app.use(cors({
  origin: "http://localhost:5173",

}));

app.use('/api',currencyRoute);

app.listen(PORT, () => {
  console.log(`Sever Listening on Port: ${PORT}`);
})
