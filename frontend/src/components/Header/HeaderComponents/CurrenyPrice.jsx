import { useEffect, useState } from "react";
import CurrencyPriceItem from "./CurrencyPriceItem";

import { getJpyKrwCurrenyPrice, getUsdKrwCurrenyPrice } from "../../../api/getCurrenyPrice";

import { HiCurrencyDollar,HiCurrencyYen } from "react-icons/hi";
import usdt from "../../../assets/usdt.svg";



const CurrenyPrice = () => {
  const [usdKrw, setUsdKrw] = useState();
  const [jpyKrw, setJpyKrw] = useState();

  useEffect(() => {
    // promise all 사용하는게 좋지 않을까?
    const getUsdKrw = async() => {
      const priceUsd = await getUsdKrwCurrenyPrice();
      const priceJpy = await getJpyKrwCurrenyPrice();
      setUsdKrw(priceUsd);
      setJpyKrw(priceJpy);
    }
    getUsdKrw();
  }, [])
  

  return (
    <div className='text-[#F5F5F5] gap-5 m-3 pl-5 max-w-screen-xl mx-auto font-light'>
        <div className='flex'>
          <CurrencyPriceItem icon={HiCurrencyDollar} price={usdKrw} />
          <CurrencyPriceItem icon={HiCurrencyYen} price={jpyKrw} />

          <div className='flex gap-2'>
            <img src={usdt} style={{ width: '24px', height: '24px' }}/>
            <p className='pr-2'>1,329 원</p>
          </div>
        </div>
      </div>
  )
}

export default CurrenyPrice