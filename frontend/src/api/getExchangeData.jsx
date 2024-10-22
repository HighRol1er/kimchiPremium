import axios from "axios";

export const getMarketDataFromUpbit = async() => {
  try {
    const response = await axios.get("http://localhost:3010/api/exchange/market-upbit");
    // console.log(response);
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.log('Error fetching data', error);
  }
  // 아래껀 기존 원본 완료되면 삭제하기
  // export const getMarketDataFromUpbit = async () => {
    // try {
    //   const response = await axios.get("https://api.upbit.com/v1/market/all?isDetails=true");
    //   const data = response.data;
    //   return data;
    // } catch (error) {
    //   console.error("Error in getMarketDataFromUpbit", error);
    // }
// }
}