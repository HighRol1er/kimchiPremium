import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import TickerTapeWidgetFromTradingView from './HeaderComponents/TickerTapeWidgetFromTradingView';
import CurrenyPrice from './HeaderComponents/CurrenyPrice';


const Header = () => {
  return (
    <>
      <TickerTapeWidgetFromTradingView />
      <div className='flex items-center justify-between mx-auto max-w-screen-2xl '> {/*pl-3 pr-5 <이 옵션 왜 넣었지?  */}
        <div className='text-white flex gap-2 p-5 '> 
          <Link to='/'>
            <div className='flex font-semibold text-4xl text-[#3a80e9] pr-10 text-stroke cursor-pointer'>
              CryptoPrice
                <p className='text-white'>.</p>
            </div>
          </Link>
        
          <div className='hidden md:block'>
          <Tabs>
            <TabList className='font-semibold gap-2'>
              <Link to='/'>
                <Tab>Exchanges</Tab>
              </Link>
              <Link to='/chart'>
                <Tab>Chart</Tab>
              </Link>
              <Link to='/marketcap'>
                <Tab>Market cap</Tab>
              </Link>
            </TabList>
          </Tabs>
          </div>
        </div>

        <div className='block md:hidden'>
          <SideDrawer />
        </div>
      </div>

      <CurrenyPrice />
    </>
  )
}

export default Header