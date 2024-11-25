// import BtcKrwBtcUsdtChart from '../components/Homepage/BtcKrwBtcUsdtChart';
// import BitcoinDChart from '../components/Homepage/BitcoinDChart';
import CoinTabs from '../components/Homepage/CoinTabs';
import ChatBox from '../components/Homepage/ChatBoxComponents/ChatBox';
import TradingViewChart from '../components/common/TradingViewChart';

/**
 * TODO: setInterval + 관심목록 업데이트( 지금 새로고침 안누르면 바로바로 업데이트 안됨)
 */
function HomePage() {

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <div className='flex flex-col sm:flex-row justify-center gap-5 bg-gray-800 rounded-lg pt-5 pb-5 h-[800px] sm:h-[450px] pl-4 pr-4'>
        <TradingViewChart symbol={"CRYPTOCAP:BTC.D"}/>
        <TradingViewChart symbol={"BITHUMB:BTCKRW/BINANCE:BTCUSDT"}/>
      </div>

      <div className='flex flex-col gap-5 mt-8 text-white pb-5 sm:flex-col lg:flex-row '>
        <div className='flex-1 bg-gray-800 rounded-lg w-full lg:w-2/3'>
          <CoinTabs />
        </div>
        <div className='w-full bg-gray-800 rounded-lg h-[800px] lg:w-1/3'>
          <ChatBox />
        </div>
      </div>
    </div>
  )
}

export default HomePage;
