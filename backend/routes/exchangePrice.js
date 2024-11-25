/**
 * Get data from Binance and Upbit
 * */ 
import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * Get market data from Upbit
 * Ticker, Price, Change Rate, Volume 
 * */ 
router.get('/market-upbit', async (req, res) => {
  const url = "https://api.upbit.com/v1/ticker/all?quote_currencies=KRW";
  try {
    const response = await axios.get(url);
    res.json(response.data);
    console.log(response);
  } catch (error) {
    console.log("Error from Upbit API", error);
    res.status(500).json({ message: 'Error in fetching data' });
  }
});

// Get ticker price from Binance
// TODO:업비트에는 있지만 바이낸스에는 없는 티커가 있어서 이거 예외처리해줘야됨
router.get('/price-binance', async(req, res) => {
  const { ticker } = req.query;
  const url = `https://www.binance.com/api/v3/ticker/price?symbol=${ticker}USDT`;

  try {
    const response = await axios.get(url);
    if (!response.data || !response.data.price) {
      // 가격 정보를 찾을 수 없을 경우
      return res.status(200).json({ price: null }); // 에러 메시지 없이 그냥 null 반환
    }
    
    const price = response.data.price; // string 

    res.json({price});
  } catch (error) {
    console.log("Error from Binance API", error);
    // res.status(500).json({ message: 'Error in fetching data' });
    res.status(200).json({ price: null });
  }
});




