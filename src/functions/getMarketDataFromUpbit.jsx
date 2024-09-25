import axios from "axios";

export const getMarketDataFromUpbit = async () => {
    try {
      const response = await axios.get("https://api.upbit.com/v1/market/all?isDetails=true");
      const data = response.data;
      // console.log(data);
      
      // KRW-TICKER들만 반환 
      // const krwMarkets = data.filter(coin => coin.market.startsWith('KRW-'));
      // console.log(krwMarkets);  // 필터링된 데이터를 콘솔에 출력

      /*
       *'KRW-'를 제거하고 TICKER만 반환 
       * console 예시 
       * ["BTC", "ETH", "XRP", "SOL", ... "WAVES","XEM"]
       */ 

      // const krwTickers = krwMarkets.map(coin => coin.market.replace('KRW-', ''));

      // console.log(krwTickers);
      // return krwTickers;
      return data;
    } catch (error) {
      console.error("Error in getMarketDataFromUpbit", error);
    }
  
}