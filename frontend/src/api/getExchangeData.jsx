import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

export const getMarketDataFromUpbit = async () => {
  try {
    // const response = await axios.get("http://localhost:3010/api/exchange/market-upbit");
    const response = await axios.get(`${API_URL}/exchange/market-upbit`);
    // console.log(response);
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error fetching data', error);
    return null;
  }
};

export const getPriceDataFromBinance = async (ticker) => {
  try {
    const response = await axios.get(`${API_URL}/exchange/price-binance`,{
      params: { ticker }
    });

    const price = response.data.price;
    return price;
  } catch (error) {
    // console.log('Error fetching data', error);
    return null;
  }
};