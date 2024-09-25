// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import BtcKrwBtcUsdtChart from '../components/Homepage/BtcKrwBtcUsdtChart';
import BitcoinDChart from '../components/Homepage/BitcoinDChart';
import SelectCoin from '../components/Homepage/SelectCoin';
import axios from 'axios';

function HomePage() {

  const fetchMarketData = async() => {
    try {
      const response = await axios.get("https://api.upbit.com/v1/market/all?isDetails=true");
      const data = response.data;
      
      
      const krwMarkets = data.filter(coin => coin.market.startsWith('KRW-'));

      console.log(krwMarkets);  // 필터링된 데이터를 콘솔에 출력
    } catch (error) {
      console.error("Error in fetchMarketData", error);
    }
  };

  useEffect(() => {
    fetchMarketData();
  },[])
  return (
    <div>
      <div className='text-white flex justify-center gap-5'>
        <BitcoinDChart />
        <BtcKrwBtcUsdtChart />
      </div>
      <SelectCoin />
    </div>
  )
}

export default memo(HomePage);
