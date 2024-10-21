import axios from "axios"
// NOTE: 바이낸스 endpoint : https://www.binance.com/api/v3/ticker/price?symbol=BNBBTC
export const getPriceDataFromBinance = async (ticker) => {
  try {
    const response = await axios.get(`https://www.binance.com/api/v3/ticker/price?symbol=${ticker}USDT`);
    const data = response.data.price; 

    // data의 type이 string 이기 때문에 Number() 사용.
    const price = Number(data).toFixed(2);

    return price;
  } catch (error) {
    console.error("Error in getPriceDataFromBinance", error);
  }
}
