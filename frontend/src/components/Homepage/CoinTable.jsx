import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import TableItems from './TableItems';

const CoinTable = ({ upbitCryptoTicker, binanceCryptoTicker, onFavoriteChange }) => {
  const [commonCryptoData, setCommonCryptoData] = useState([]);

  const handleFavoriteChange = (updatedFavorites) => {
    if (onFavoriteChange) {
      onFavoriteChange(updatedFavorites);
    }
  };
  
  useEffect(() => {
    // NOTE: Wait upbit & binance crypto data 
    if (upbitCryptoTicker.length === 0 && binanceCryptoTicker.length === 0) {
      // console.log("Waiting for crypto data");
      return; 
    }

    const mergeTicker = upbitCryptoTicker.map(upbitTicker => {
      const matchingBinanceCrypto = binanceCryptoTicker.find(
        binanceCoin => binanceCoin.binance_ticker === upbitTicker.market
      );

      if(matchingBinanceCrypto) {
        return {
          ...upbitTicker,
          binance_price: matchingBinanceCrypto.binance_price
        };
      };
      return upbitTicker;
    });
    setCommonCryptoData(mergeTicker);
    
  }, [upbitCryptoTicker, binanceCryptoTicker]);

  // console.log(commonCryptoData);

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
          {commonCryptoData.map((coin,index) => {
            return (
              <TableItems coin={coin} key={index} onFavoriteChange={handleFavoriteChange} />
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CoinTable