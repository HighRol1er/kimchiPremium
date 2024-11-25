import { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import { getDataFromBinance, getMarketDataFromUpbit } from '../../api/getExchangeData';

import ExchangePair from './TableComponents/ExchangePair';
import CoinTable from './CoinTable';

const CoinTabs = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [favoriteCoins, setFavoriteCoins] = useState([]);

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

    // 즐찾
    const storedFavoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
    setFavoriteCoins(storedFavoriteCoins);
  },[])

    // 탭 변경 시 즐겨찾기 코인 다시 로드
    useEffect(() => {
      if (selectedTab === 1) {
        const storedFavoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
        setFavoriteCoins(storedFavoriteCoins);
      }
    }, [selectedTab]);
  
  // console.log(binanceCryptoTicker);
  const filteredCoins = selectedTab === 1 ? favoriteCoins : [...upbitCryptoTicker, ...binanceCryptoTicker]; 

  const handleTabChange = (index) => {
    setSelectedTab(index); // 탭 변경 시 인덱스 업데이트
  };
  console.log(selectedTab);
  return (
    <div>
      <Tabs isFitted variant='line' size='lg' defaultIndex={1} onChange={handleTabChange}>
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
            {/* <CoinTable upbitCryptoTicker={upbitCryptoTicker} binanceCryptoTicker={binanceCryptoTicker} /> */}
            <CoinTable upbitCryptoTicker={filteredCoins} binanceCryptoTicker={filteredCoins} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default CoinTabs