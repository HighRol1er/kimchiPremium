import { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import ExchangePair from './TableComponents/ExchangePair';

import { getDataFromBinance, getMarketDataFromUpbit } from '../../api/getExchangeData';

import CoinTable from './CoinTable';


const CoinTabs = () => {
  const [upbitCryptoTicker, setUpbitCryptoTicker] = useState([]);
  const [binanceCryptoTicker, setBinanceCryptoTicker] = useState([]);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const [upbit, binance] = await Promise.all([
          getMarketDataFromUpbit(),
          getDataFromBinance(),
        ]);

        setUpbitCryptoTicker(upbit);
        setBinanceCryptoTicker(binance);
      } catch (error) {
        console.error(error);
      }
    }
    getCryptoData();
  },[])
  // console.log(binanceCryptoTicker);
  return (
    <div>
      <Tabs isFitted variant='line' size='lg' defaultIndex={0}>
        <TabList mb='1em'>
          <Tab _hover={{ bg: 'gray.700', color: 'gray.100' }}>전체</Tab>
          <Tab _hover={{ bg: 'gray.700', color: 'gray.100' }}>관심</Tab>
        </TabList>
        <div className='pl-4'>
          <ExchangePair />
        </div>
        
        <TabPanels>
          <TabPanel>

            <CoinTable upbitCryptoTicker={upbitCryptoTicker} binanceCryptoTicker={binanceCryptoTicker} />
            
          </TabPanel>
          <TabPanel>
            
            {/* <WatchListCoinsTable allCoinDataFromUpbit={allCoinDataFromUpbit} usdKrw={usdKrw}/> */}
            <CoinTable upbitCryptoTicker={upbitCryptoTicker} binanceCryptoTicker={binanceCryptoTicker} />

          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default CoinTabs