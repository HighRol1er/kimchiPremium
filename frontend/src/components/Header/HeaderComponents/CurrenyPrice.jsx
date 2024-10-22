import { useEffect, useState } from "react";
import CurrencyPriceItem from "./CurrencyPriceItem";

import { getJpyKrwCurrenyPrice, getKrwUsdtCurrencyPrice, getUsdKrwCurrenyPrice, getUsdtUsdCurrencyPrice } from "../../../api/getCurrenyPrice";

import { HiCurrencyDollar,HiCurrencyYen } from "react-icons/hi";
import { SiTether } from "react-icons/si";
import usdt from "../../../assets/usdt.svg";



const CurrenyPrice = () => {
  const [usdKrw, setUsdKrw] = useState("");
  const [jpyKrw, setJpyKrw] = useState("");
  const [krwUsdt, setKrwUSdt] = useState("");
  const [usdtKrw, setUsdtKrw] = useState("");

  useEffect(() => {
    // promise all 사용하는게 좋지 않을까?
    const getUsdKrw = async() => {
      const priceUsd = await getUsdKrwCurrenyPrice();
      const priceJpy = await getJpyKrwCurrenyPrice();
      const priceKrwUsdt = await getKrwUsdtCurrencyPrice();
      const priceUsdtUsd = await getUsdtUsdCurrencyPrice();
      setUsdKrw(priceUsd);
      setJpyKrw(priceJpy);
      setKrwUSdt(priceKrwUsdt);
      setUsdtKrw(priceUsdtUsd);
    }
    getUsdKrw();
  }, [])
  

  return (
    <div className='text-[#F5F5F5] gap-5 m-3 pl-5 max-w-screen-xl mx-auto font-light'>
        <div className='flex'>
          <CurrencyPriceItem icon={HiCurrencyDollar} price1={usdKrw} />
          <CurrencyPriceItem icon={HiCurrencyYen} price1={jpyKrw} />
          <div className='flex gap-2'>
            <img src={usdt} style={{ width: '24px', height: '24px' }}/>
            <p className='pr-2'>{krwUsdt} 원, {usdtKrw} $</p>
          </div>
        </div>
      </div>
  )
}

export default CurrenyPrice