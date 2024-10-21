import axios from "axios";

export const getMarketDataFromUpbit = async () => {
    try {
      const response = await axios.get("https://api.upbit.com/v1/market/all?isDetails=true");
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error in getMarketDataFromUpbit", error);
    }
  
}