import { createContext, useEffect, useState } from "react";
import { getUsdKrwCurrenyPrice } from "../api/getCurrenyPrice";

export const UsdKrwContext = createContext();

export const UsdKrwProvider = ({ children}) => {
  const [usdKrwPrice, setUsdKrwPrice] = useState();

  useEffect(() => {
    const getUsdKrwPrice = async () => {
      const response = await getUsdKrwCurrenyPrice();
      // console.log(response);
      setUsdKrwPrice(response);
    }

    getUsdKrwPrice();
  }, []);


  return (
    <UsdKrwContext.Provider value={{ usdKrwPrice }}>
      {children}
    </UsdKrwContext.Provider>
  );
};