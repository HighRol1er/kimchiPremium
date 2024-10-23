import React, { useEffect, useRef, memo } from 'react';
import BtcKrwBtcUsdtChart from '../components/Homepage/BtcKrwBtcUsdtChart';
import BitcoinDChart from '../components/Homepage/BitcoinDChart';
import CoinTabs from '../components/Homepage/CoinTabs';

/**
 * TODO: setInterval + 관심목록 업데이트( 지금 새로고침 안누르면 바로바로 업데이트 안됨)
 */
function HomePage() {

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <div className='flex justify-center gap-5 bg-gray-800 rounded-lg pt-5 pb-5'>
        <BitcoinDChart />
        <BtcKrwBtcUsdtChart />
      </div>

      <div className='flex gap-5 mt-8 text-white pb-5 '>
        <div className='flex-1 bg-gray-800  rounded-lg'>
          <CoinTabs />
        </div>
        <div className='w-1/3 bg-gray-800  rounded-lg h-[800px]'>
          chatbox
        </div>
      </div>
    </div>
  )
}

export default memo(HomePage);
