import axios from "axios";

export const getUsdKrwCurrenyPrice = async () => {
  try {
    const response = await axios.get('http://localhost:3010/api/usd-krw');
    const priceData = response.data.usd_krw;
    const usdKrwPrice = priceData.slice(0, -3);

    return usdKrwPrice;
  } catch (error) {
    console.log('Error fetching USD-KRW', error);
  }
};

export const getJpyKrwCurrenyPrice = async () => {
  try {
    const response = await axios.get('http://localhost:3010/api/jpy-krw');
    const priceData = response.data.jpy_krw;

    return priceData;
  } catch (error) {
    console.log('Error fetching JPY-KRW', error);
  }
};

export const getKrwUsdtCurrencyPrice = async () => {
  try {
    const response = await axios.get('http://localhost:3010/api/upbit-krw-usdt');
    const priceData = response.data.price.toLocaleString();

    return priceData;
  } catch (error) {
    console.log('Error fetching KRW-USDT', error);
  }
}

export const getUsdtUsdCurrencyPrice = async () => {
  try {
    const response = await axios.get('http://localhost:3010/api/usdt-usd');
    const priceData = response.data.usdt_usd;

    return priceData;
  } catch (error) {
    console.log('Error fetching USDT-USD', error);
  }
}