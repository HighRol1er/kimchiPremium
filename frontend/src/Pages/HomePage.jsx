import React, { useEffect, useRef, memo } from 'react';
import BtcKrwBtcUsdtChart from '../components/Homepage/BtcKrwBtcUsdtChart';
import BitcoinDChart from '../components/Homepage/BitcoinDChart';
import SelectCoin from '../components/Homepage/SelectCoin';

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

      <div className='flex gap-5 mt-5'>
        <div className='flex-1 bg-gray-800 mt-5 rounded-lg'>
          <SelectCoin />
        </div>
        <div className='w-1/3 text-white bg-gray-800 mt-5 rounded-lg h-[800px]'>
          chatbox
        </div>
      </div>
    </div>
  )
}

export default memo(HomePage);
