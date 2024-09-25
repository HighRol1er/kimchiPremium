import axios from "axios";

export const getPriceDataFromUpbit = async (ticker) => {
  try {
    const response = await axios.get("https://api.upbit.com/v1/ticker/all", {
        params: {
          quoteCurrencies: "KRW"
        }
    });
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error in getPriceDataFromUpbit", error);
  }
}