import React, { useEffect, useRef, memo } from 'react';
import BtcKrwBtcUsdtChart from '../components/Homepage/BtcKrwBtcUsdtChart';
import BitcoinDChart from '../components/Homepage/BitcoinDChart';
import SelectCoin from '../components/Homepage/SelectCoin';

/**
 * TODO: setInterval + 관심목록 업데이트( 지금 새로고침 안누르면 바로바로 업데이트 안됨)
 */
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
