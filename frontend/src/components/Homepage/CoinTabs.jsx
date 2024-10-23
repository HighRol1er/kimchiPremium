import { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import ExchangePair from './TableComponents/ExchangePair';
import AllCoinsTable from './TableComponents/AllCoinsTable';
import WatchListCoinsTable from './WatchlistCompoents/WatchlistCoinsTable';

import { getMarketDataFromUpbit } from '../../api/getExchangeData';
import { getUsdKrwCurrenyPrice } from '../../api/getCurrenyPrice';


const CoinTabs = () => {
  const [allCoinDataFromUpbit, setAllCoinDataFromUpbit] = useState([]);
  const [usdKrw, setUsdKrw] = useState();

  useEffect(() => {
    const getCurrencyPriceAndExchangeData = async () => {
      try {
        const [priceUsdKrw, coinData] = await Promise.all([
          getUsdKrwCurrenyPrice(),
          getMarketDataFromUpbit(),
        ]);
  
        setUsdKrw(priceUsdKrw);
        setAllCoinDataFromUpbit(coinData);
      } catch (error) {
        console.error("Failed to fetch prices: ", error);
      }
    }
    getCurrencyPriceAndExchangeData();
  }, []);


  return (
    <div>
      <Tabs isFitted variant='line' size='lg' defaultIndex={1}>
        <TabList mb='1em'>
          <Tab _hover={{ bg: 'gray.700', color: 'gray.100' }}>전체</Tab>
          <Tab _hover={{ bg: 'gray.700', color: 'gray.100' }}>관심</Tab>
        </TabList>
        <div className='pl-4'>
          <ExchangePair />
        </div>
        
        <TabPanels>
          <TabPanel>
            <AllCoinsTable allCoinDataFromUpbit={allCoinDataFromUpbit} usdKrw={usdKrw} />
          </TabPanel>
          <TabPanel>
            
            <WatchListCoinsTable allCoinDataFromUpbit={allCoinDataFromUpbit} usdKrw={usdKrw}/>
          
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default CoinTabs