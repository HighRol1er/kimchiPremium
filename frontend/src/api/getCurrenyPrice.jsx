import axios from "axios";

export const getUsdKrwCurrenyPrice = async () => {
  try {
    const response = await axios.get('http://localhost:3010/api/usd-krw');
    // console.log(response);
    const priceData = response.data.usd_krw;
    const usdKrwPrice = priceData.slice(0, -3);
    
    // console.log(typeof(priceData));
    console.log(usdKrwPrice);
    return usdKrwPrice;
  } catch (error) {
    console.log('Error fetching USD-KRW', error);
  }
};

export const getJpyKrwCurrenyPrice = async () => {
  try {
    const response = await axios.get('http://localhost:3010/api/jpy-krw');
    // console.log(response);
    const priceData = response.data.jpy_krw;
    // const usdKrwPrice = priceData.slice(0, -3);
    
    // console.log(typeof(priceData));
    console.log(priceData);
    return priceData;
  } catch (error) {
    console.log('Error fetching USD-KRW', error);
  }
};
