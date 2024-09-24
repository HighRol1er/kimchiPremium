import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';

import btc from "../../assets/btcforproject.svg";
import usd from "../../assets/money1.svg";
import jpy from "../../assets/money2.svg";
import usdt from "../../assets/usdt.svg";


const Header = () => {
  return (
    <>
      <div className='flex items-center justify-between mx-auto max-w-screen-xl pl-3 pr-5'>
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

      {/* NOTE: 이거 컴포넌트로 바꾸자 중복된다. */}
      <div className='text-white flex gap-5 m-3 max-w-screen-xl mx-auto pl-8'>
        <div className='flex gap-1'>
          <img src={usd} style={{ width: '24px', height: '24px' }}/>
          <p>1,329 원</p>
        </div>
        <div className='flex gap-1'>
          <img src={jpy} style={{ width: '24px', height: '24px' }}/>
          <p>9.2823 원</p>
        </div>
        <div className='flex gap-1'>
          <img src={usdt} style={{ width: '24px', height: '24px' }}/>
          <p>1,328.3 원</p>
        </div>
      </div>
    </>
  )
}

export default Header