import express from "express";
import axios from "axios";
import * as cheerio from 'cheerio';
import cors from "cors";
// import { createServer } from 'http';
// import { Server } from 'socket.io';

const app = express();
app.use(cors({
  origin: "http://localhost:5173"
}))
const PORT = 3010;

// Get USD-KRW price from Google-Finance
app.get('/api/usd-krw', async (req, res) => {
  const url = "https://www.google.com/finance/quote/USD-KRW";

  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const price = $('.YMlKec.fxKbKc').text();

    res.json({ usd_krw: price });
  } catch (error) {
    console.log("Error from CrawlingUsdKrw", error);
    res.status(500).json({ message: 'Error in fetching data' });
  }
});

// Get JPY-KRW price from Google-Finance
app.get('/api/jpy-krw', async (req,res) => {
  const url = "https://www.google.com/finance/quote/JPY-KRW";

  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const price = $('.YMlKec.fxKbKc').text();

    res.json({ jpy_krw: price});
  } catch (error) {
    console.log("Error from CrawlingJpyKrw", error);
    res.status(500).json({ message: 'Error in fetching data' });
  }
});

// Get USDT-USD price from Google-Finance
app.get('/api/usdt-usd', async (req, res) => {
  const url = "https://www.google.com/finance/quote/USDT-USD";

  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);
    const price = $('.YMlKec.fxKbKc').text();

    res.json({ usdt_usd: price });
  } catch (error) {
    console.log("Error from CrawlingUsdtUsd", error);
    res.status(500).json({ message: 'Error in fetching data' });
  }
});

// Get KRW-USDT price from Upbit API
app.get('/api/upbit-marketdata', async (req, res) => {
  const url = "https://api.upbit.com/v1/ticker?markets=KRW-USDT";

  try {
    const response = await axios.get(url);
    const price = response.data[0].trade_price;
    // const data = response.data;
    
    res.json({ price });
  } catch (error) {
    console.log("Error from Upbit KRW-USDT", error);
    res.status(500).json({ message: 'Error in fetching data' });
  }
});


app.listen(PORT, () => {
  console.log(`Sever Listening on Port: ${PORT}`);
})
