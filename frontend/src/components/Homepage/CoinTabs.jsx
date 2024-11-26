import { useEffect, useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import { getDataFromBinance, getMarketDataFromUpbit } from '../../api/getExchangeData';

import ExchangePair from './TableComponents/ExchangePair';
import CoinTable from './CoinTable';
import { getUsdKrwCurrenyPrice } from '../../api/getCurrenyPrice';

const CoinTabs = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [favoriteCoins, setFavoriteCoins] = useState([]);

  const [upbitCryptoTicker, setUpbitCryptoTicker] = useState([]);
  const [binanceCryptoTicker, setBinanceCryptoTicker] = useState([]);
  const [krwUsd, setKrwUsd] = useState(null);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const [upbit, binance, krwusd] = await Promise.all([
          getMarketDataFromUpbit(),
          getDataFromBinance(),
          getUsdKrwCurrenyPrice(),
        ]);
        setKrwUsd(krwusd);
        setUpbitCryptoTicker(upbit);
        setBinanceCryptoTicker(binance);
      } catch (error) {
        console.error(error);
      }
    }
    getCryptoData();

    // const interval = setInterval(() => {
    //   getCryptoData();
    // }, 3000);

    // // Cleanup: 컴포넌트 언마운트 시 인터벌 정리
    // return () => clearInterval(interval);

  },[])

    // 탭 변경 시 즐겨찾기 코인 다시 로드
    useEffect(() => {
      // console.log("실행2")
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
  // console.log(selectedTab);
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
            <CoinTable upbitCryptoTicker={upbitCryptoTicker} binanceCryptoTicker={binanceCryptoTicker} krwUsd={krwUsd}/>
          </TabPanel>
          <TabPanel>
            {/* <CoinTable upbitCryptoTicker={upbitCryptoTicker} binanceCryptoTicker={binanceCryptoTicker} /> */}
            <CoinTable upbitCryptoTicker={filteredCoins} binanceCryptoTicker={filteredCoins} onFavoriteChange={setFavoriteCoins} krwUsd={krwUsd} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default CoinTabs