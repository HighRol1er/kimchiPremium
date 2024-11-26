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

const usdtTickers = [];

router.get('/exchange/market-upbit', async (req, res) => {
  const url = "https://api.upbit.com/v1/ticker/all?quote_currencies=KRW";
  try {
    const response = await axios.get(url);
    // console.log(response);
    const coinData = response.data;

    const onlyTickers = coinData.map(ticker => ticker.market.replace('KRW-',''));
    // usdtTickers.push(onlyTickers.map(ticker => `USDT${ticker}`));
    usdtTickers.push(...onlyTickers.map(ticker => `${ticker}USDT`));
    
    res.json(response.data);
    // console.log(usdtTickers);
  } catch (error) {
    console.log("Error from Upbit API", error);
    res.status(500).json({ message: 'Error in fetching data' });
  }
});


router.get('/exchange/batch-price-binance', async(req, res) => {
  const url = 'https://api.binance.com/api/v3/ticker/price';
  
  try {
    const response = await axios.get(url);
    const data = response.data;
    // console.log(data); // 2700개 불러오네 ㅋㅋ

    // USDT 페어만 필터링 // 530로 확 줄어듬
    const usdtPairTickers = data.filter(ticker => ticker.symbol.endsWith('USDT'));
    // console.log(usdtPairTickers);

    // // 티커 + 가격 데이터만 추출 
    const binanceData =  usdtPairTickers.map(ticker => ({
      binance_ticker: `KRW-${ticker.symbol.slice(0,-4)}`,
      binance_price: ticker.price
    }));
    // console.log(binanceData);

    res.json(binanceData);
  } catch (error) {
      console.log("Error from Binance API", error);
      res.status(500).json({ message: 'Error in fetching data' });
  }
});

// Get ticker price from Binance
// router.get('/exchange/price-binance', async(req, res) => {
//   const { ticker } = req.query;
//   const url = `https://www.binance.com/api/v3/ticker/price?symbol=${ticker}USDT`;
  
//   try {
//     const response = await axios.get(url);
//     const price = response.data.price; // string 

//     res.json({price});
//   } catch (error) {
//     console.log("Error from Binance API", error);
//     res.status(500).json({ message: 'Error in fetching data' });
//   }
// });

export default router;