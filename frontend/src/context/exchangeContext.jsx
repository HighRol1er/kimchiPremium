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

    const interval = setInterval(() => {
      getUsdKrwPrice();
    }, 60000);

    // Cleanup: 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval);
  }, []);


  return (
    <UsdKrwContext.Provider value={{ usdKrwPrice }}>
      {children}
    </UsdKrwContext.Provider>
  );
};