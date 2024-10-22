import { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import AllCoinsTable from './TableComponents/AllCoinsTable';
import ExchangePair from './TableComponents/ExchangePair';

import { getMarketDataFromUpbit } from '../../api/getExchangeData';


const CoinTabs = () => {

  const [allCoinDataFromUpbit, setAllCoinDataFromUpbit] = useState([]);

  useEffect(() => {
    const getExchangeData = async () => {
      const coinData = await getMarketDataFromUpbit();
      setAllCoinDataFromUpbit(coinData);
    }

    getExchangeData();
  },[]);

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
            <AllCoinsTable allCoinDataFromUpbit={allCoinDataFromUpbit} />
          </TabPanel>
          <TabPanel>
            
            <p>two!</p>{/**즐찾하기 */}
          
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default CoinTabs