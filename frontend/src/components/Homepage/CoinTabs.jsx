import { useEffect, useState } from 'react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AllCoinsTable from './TableComponents/AllCoinsTable';

// import WatchlistCoinsTable from './WatchlistCoinsTable';
import { getMarketDataFromUpbit } from '../../api/getExchangeData';
import ExchangePair from './TableComponents/ExchangePair';


const CoinTabs = () => {

  const [allCoinDataFromUpbit, setAllCoinDataFromUpbit] = useState([]);
  // const [watchlistCoin, setWatchlistCoin] = useState([]); 

  // useEffect(() => {
  //   upbitMarketData();

  //   const storedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
  //   setWatchlistCoin(storedWatchlist);
  // },[]);

  useEffect(() => {
    const getExchangeData = async () => {
      const coinData = await getMarketDataFromUpbit();
      setAllCoinDataFromUpbit(coinData);
    }

    getExchangeData();
  },[]);
  
  // console.log(allCoinDataFromUpbit);
  return (
    // <div className='flex justify-center'>
    //   <Tabs isFitted variant='enclosed' size='lg'>
    //   <TabList mb='1em'>
    //     <Tab>전체</Tab>
    //     <Tab>관심</Tab>
    //   </TabList>

    //   <TabPanels>
    //     <TabPanel>
    //       {/* <AllCoinsTable coinData={coinData} /> */}
    //     </TabPanel>
    //     <TabPanel>
    //       {/* <WatchlistCoinsTable 
    //           coinData={coinData.filter((coin) => watchlistCoin.includes(coin.market.replace('KRW-', '')))}
    //         /> */}
    //     </TabPanel>
    //   </TabPanels>
    //   </Tabs>
    // </div>
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