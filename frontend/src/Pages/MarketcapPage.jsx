import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import axios from 'axios';
import { useEffect, useState } from 'react';

const MarketcapPage = () => {
  const [coins, setCoins] = useState([]);

  const getCoinsFromGeckoApi = async () => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
      console.log(response.data);
      const coinData = response.data;
      setCoins(coinData);
    } catch (error) {
      console.error("Error in getCoinsFromGeckoApi", error);
    }
  
  };
  
  useEffect(() => {
    getCoinsFromGeckoApi();
  },[]);

  return (
    <div className='text-white max-w-screen-xl mx-auto'>
      <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>Rank</Th>
        <Th>이름</Th>
        <Th>가격</Th>
        <Th>시가총액</Th>
        <Th>유통 공급량</Th>
      </Tr>
    </Thead>
    <Tbody>
    {coins && coins.map((coin, index) => {
        return(
          <Tr key={coin.id}>
            <Td>{coin.market_cap_rank}</Td>
            <Td>
              <img
                src={coin.image}
                alt={coin.name}
                className="w-8 h-8 rounded-full inline-block mr-2"
              />
              {(coin.symbol).toUpperCase()}
            </Td>
            <Td>$ {coin.current_price.toLocaleString()}</Td>
            <Td>{coin.market_cap.toLocaleString()}</Td>
            <Td>{coin.circulating_supply.toLocaleString()}</Td>
          </Tr>
        )
      })}
    </Tbody>
  </Table>
</TableContainer>
      
    </div>
  )
}

export default MarketcapPage