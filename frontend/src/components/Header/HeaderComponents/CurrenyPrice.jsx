import { useEffect, useState } from "react";
import CurrencyPriceItem from "./CurrencyPriceItem";

import { getJpyKrwCurrenyPrice, getKrwUsdtCurrencyPrice, getUsdKrwCurrenyPrice, getUsdtUsdCurrencyPrice } from "../../../api/getCurrenyPrice";

import { HiCurrencyDollar,HiCurrencyYen } from "react-icons/hi";
import usdt from "../../../assets/usdt.svg";

const CurrenyPrice = () => {
  const [usdKrw, setUsdKrw] = useState("");
  const [jpyKrw, setJpyKrw] = useState("");
  const [krwUsdt, setKrwUSdt] = useState("");
  const [usdtKrw, setUsdtKrw] = useState("");

  useEffect(() => {
    // promise all 사용하는게 좋지 않을까?
    const getCurrencyPrice = async () => {
      try {
        const [priceUsdKrw, priceJpyKrw, priceKrwUsdt, priceUsdtUsd] = await Promise.all([
          getUsdKrwCurrenyPrice(),
          getJpyKrwCurrenyPrice(),
          getKrwUsdtCurrencyPrice(),
          getUsdtUsdCurrencyPrice(),
        ]);

        setUsdKrw(priceUsdKrw);
        setJpyKrw(priceJpyKrw);
        setKrwUSdt(priceKrwUsdt);
        setUsdtKrw(priceUsdtUsd);
      } catch (error) {
        console.error("Failed to fetch currency prices: ", error);
      }
    }
    getCurrencyPrice();
  }, []);

  return (
    <div className='text-[#F5F5F5] gap-5 m-3 pl-5 max-w-screen-2xl mx-auto font-light'>
        <div className='flex'>
          <CurrencyPriceItem icon={HiCurrencyDollar} price1={usdKrw} />
          <CurrencyPriceItem icon={HiCurrencyYen} price1={jpyKrw} />
          <div className='flex gap-2'>
            <img src={usdt} style={{ width: '24px', height: '24px' }}/>
            <p className='pr-2'>{krwUsdt} ₩, {usdtKrw} $</p>
          </div>
        </div>
      </div>
  )
}

export default CurrenyPrice