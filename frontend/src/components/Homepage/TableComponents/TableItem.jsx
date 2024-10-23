import { useEffect, useState } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { getPriceDataFromBinance } from '../../../api/getExchangeData';

const TableItem = ({ coinData, usdKrw }) => {
  const [binanceCoinPrice, setBinanceCoinPrice] = useState();
  const [binanceDollarToWon, setBinanceDollarToWon] = useState('');
  
  const ticker = coinData.market.replace('KRW-','');
  const upbitPrice = coinData.trade_price.toLocaleString();
  const change = (Number(coinData.signed_change_rate)* 100).toFixed(2);
  const volume = (Number(coinData.acc_trade_price_24h) / 100_000_000).toFixed(0);
  const formatVolume = volume.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    const getExchangeData = async () => {
      const coinPrice = await getPriceDataFromBinance(ticker);
      const formatCoinPrice = Number(coinPrice).toFixed(2);

      setBinanceCoinPrice(formatCoinPrice);

    };

    getExchangeData();
  },[]);

  useEffect(() => {
    if (usdKrw && binanceCoinPrice) { 
      // usdKrw, binanceCoinPrice의 값이 문자열이라 숫자로 변환 후 곱함 
      const usdKrwToNumber = Number(usdKrw.replace(/,/g, ''));
      const binancePriceToNumber = Number(binanceCoinPrice);
      
      setBinanceDollarToWon((usdKrwToNumber * binancePriceToNumber).toFixed(2));
    } else {
      setBinanceDollarToWon(''); // 초기화
    }
  }, [usdKrw, binanceCoinPrice]); // usdKrw 또는 binanceCoinPrices가 변경될 때마다 실행
  

  const upbitPriceMinusBinancePrice = (Number(upbitPrice.replace(/,/g, '')) - Number(binanceDollarToWon)).toFixed(2);
  const premiumPercentage = ((upbitPriceMinusBinancePrice / Number(binanceDollarToWon))* 100).toFixed(2);
  return (
    <>
      <Tr>
        <Td>
          <div className='flex'>
          <FaStar className='text-yellow-400 mr-2'/>
          {ticker}
          </div>
        </Td>
        <Td>{isNaN(binanceCoinPrice) ? "" : binanceCoinPrice}</Td>
        <Td>{isNaN(binanceDollarToWon) ? "" : binanceDollarToWon}</Td>
        <Td>{upbitPrice}</Td>
        <Td isNumeric>{change}%</Td>
        <Td isNumeric>{formatVolume} 억</Td>
        <Td isNumeric>
          {isNaN(upbitPriceMinusBinancePrice) ? "" : upbitPriceMinusBinancePrice}
          {isNaN(premiumPercentage) ? "" : ` (${premiumPercentage}%)`} 
        </Td>
      </Tr>
    </>
  )
}

export default TableItem