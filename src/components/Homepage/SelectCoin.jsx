import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AllCoinsTable from './AllCoinsTable';
import WatchlistCoinsTable from './WatchlistCoinsTable';
import { getPriceDataFromUpbit } from '../../functions/getPriceDataFromUpbit';
import { useEffect, useState } from 'react';

const SelectCoin = () => {
  const [coinData, setCoinData] = useState([]);
  const [watchlistCoin, setWatchlistCoin] = useState([]);

  const upbitMarketData = async () => {
    const data = await getPriceDataFromUpbit();
    // console.log(data);
    
    setCoinData(data);
  };

  useEffect(() => {
    upbitMarketData();

    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    setWatchlistCoin(storedWatchlist);
  },[]);

  return (
    <div className='max-w-screen-xl mx-auto text-white'>

      <Tabs isFitted variant='line' size='lg'>
      <TabList mb='1em'>
        <Tab>전체</Tab>
        <Tab>관심</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <AllCoinsTable coinData={coinData} />
        </TabPanel>
        <TabPanel>
          <WatchlistCoinsTable 
              coinData={coinData.filter((coin) => watchlistCoin.includes(coin.market.replace('KRW-', '')))}
            />
        </TabPanel>
      </TabPanels>
    </Tabs>
    </div>
  )
}

export default SelectCoin