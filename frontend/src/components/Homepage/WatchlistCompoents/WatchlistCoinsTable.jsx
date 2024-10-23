import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import TableItem from '../TableComponents/TableItem';

/** WatchList 수정해야됨 지금 새로고침해야만 추가/제거된게 보임 */
const WatchListCoinsTable = ({ allCoinDataFromUpbit, usdKrw }) => {
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem('watchlist')) || [];
  });

  const filteredCoinData = allCoinDataFromUpbit.filter(coinData => 
    watchlist.includes(coinData.market.replace('KRW-', ''))
  );


  return (
      <TableContainer>
      <Table variant='striped' colorScheme='whiteAlpha' size='sm'>
      <Thead>
          <Tr>
            <Th><ul className='text-white pl-6'>코인</ul></Th>
            <Th><ul className='text-white'>Binance($)</ul></Th>
            <Th><ul className='text-white'>Binance(￦)</ul></Th>
            <Th><ul className='text-white'>Upbit(￦)</ul></Th>
            <Th isNumeric><ul className='text-white'>등락(%)</ul></Th>
            <Th isNumeric><ul className='text-white'>거래량</ul></Th>
            <Th isNumeric><ul className='text-white pr-6'>프리미엄(￦)</ul></Th>
          </Tr>
        </Thead>

          <Tbody>
          {filteredCoinData.map((coinData, index) => (
            <TableItem key={index} coinData={coinData} usdKrw={usdKrw} />
          ))}  
          </Tbody>
          
      </Table>
    </TableContainer>
    
  )
}

export default WatchListCoinsTable