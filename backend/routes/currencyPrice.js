/**
 * Get currency data(price) from Google-finance and Upbit
 * */ 

import express from "express";
import axios from "axios";
import * as cheerio from 'cheerio';

const router = express.Router();


// Get USD-KRW price from Google-Finance
router.get('/usd-krw', async (req, res) => {
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
router.get('/jpy-krw', async (req,res) => {
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
router.get('/usdt-usd', async (req, res) => {
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
router.get('/upbit-krw-usdt', async (req, res) => {
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


/**
 * Get market data from Upbit
 * Ticker, Price, Change Rate, Volume 
 * */ 
router.get('/exchange/market-upbit', async (req, res) => {
  const url = "https://api.upbit.com/v1/ticker/all?quote_currencies=KRW";
  try {
    const response = await axios.get(url);
    res.json(response.data);

  } catch (error) {
    console.log("Error from Upbit API", error);
    res.status(500).json({ message: 'Error in fetching data' });
  }
});

// Get ticker price from Binance
// TODO:업비트에는 있지만 바이낸스에는 없는 티커가 있어서 이거 예외처리해줘야됨
router.get('/exchange/price-binance', async(req, res) => {
  const { ticker } = req.query;
  const url = `https://www.binance.com/api/v3/ticker/price?symbol=${ticker}USDT`;

  try {
    const response = await axios.get(url);
    const price = response.data.price; // string 

    res.json({price});
  } catch (error) {
    console.log("Error from Binance API", error);
    res.status(500).json({ message: 'Error in fetching data' });
  }
});

export default router;