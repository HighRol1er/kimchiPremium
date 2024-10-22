/**
 * Get data from Binance and Upbit
 * */ 
import express from "express";
import axios from "axios";

const router = express.Router();

router.get('/market-upbit', async (req, res) => {
  const url = "https://api.upbit.com/v1/ticker/all?quote_currencies=KRW";
  try {
    const response = await axios.get(url);
    res.json(response.data);

  } catch (error) {
    console.log("Error from Upbit API", error);
    res.status(500).json({ message: 'Error in fetching data' });
  }
});


export default router;
