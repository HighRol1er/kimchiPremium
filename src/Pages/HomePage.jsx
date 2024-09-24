// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import BtcKrwBtcUsdtChart from '../components/Homepage/BtcKrwBtcUsdtChart';
import BitcoinDChart from '../components/Homepage/BitcoinDChart';
import SelectCoin from '../components/Homepage/SelectCoin';

function HomePage() {
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
