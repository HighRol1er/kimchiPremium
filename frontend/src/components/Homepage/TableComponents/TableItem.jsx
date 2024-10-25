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

  const isInWatchlist = (ticker) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    return watchlist.includes(ticker);
  };

  // 즐겨찾기 : ticker를 localStorage에 저장
  const handleWatchlist = () => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (!watchlist.includes(ticker)) {
      // save
      watchlist.push(ticker);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      alert(`${ticker} has been added to your watchlist!`);
    } else {
      // remove
      watchlist = watchlist.filter(coin => coin !== ticker);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      alert(`${ticker} has been removed from your watchlist.`);
    }
  };

  return (
    <>
      <Tr>
        <Td>
          <div className='flex'>
          <FaStar 
              className={`mr-2 cursor-pointer ${isInWatchlist(ticker) ? 'text-yellow-400' : 'text-gray-400'}`} 
              onClick={handleWatchlist} // 클릭 시 localStorage에 ticker 추가 또는 제거
            />
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