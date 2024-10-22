import axios from "axios";

export const getMarketDataFromUpbit = async () => {
  try {
    const response = await axios.get("http://localhost:3010/api/exchange/market-upbit");
    // console.log(response);
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error fetching data', error);
  }
};

export const getPriceDataFromBinance = async (ticker) => {
  try {
    const response = await axios.get('http://localhost:3010/api/exchange/price-binance',{
      params: { ticker }
    });

    const price = response.data.price;
    return price;
  } catch (error) {
    console.log('Error fetching data', error);
  }
};