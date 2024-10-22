import { useEffect, useState } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { getPriceDataFromBinance } from '../../../api/getExchangeData';
// import { saveCoinsToWatchlist } from '../../functions/saveCoinsToWatchList';
// import { removeCoinsToWatchlist } from '../../functions/removeCoinsToWatchlist';

const TableItem = ({ coinData, usdKrw }) => {
  const [binanceCoinPrice, setBinanceCoinPrice] = useState();
  const [convertedPrice, setConvertedPrice] = useState('');
  console.log(usdKrw);
  
  // const watchlist =JSON.parse(localStorage.getItem("watchlist"));
  
  // const [isCoinInWatchlist, setIsCoinInWatchlist] = useState(watchlist?.includes(ticker));
  
  const ticker = coinData.market.replace('KRW-','');
  const upbitPrice = coinData.trade_price.toLocaleString();
  const change = (Number(coinData.signed_change_rate)* 100).toFixed(2);
  const volume = (Number(coinData.acc_trade_price_24h) / 100_000_000).toFixed(0);
  const formatVolume = volume.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  // const checkWatchlist = (e) => {
  //   if(watchlist) {
  //     setIsCoinInWatchlist(prev => !prev);
  //   } else {
  //     setIsCoinInWatchlist(prev => !prev);
  //   }
  //   if(isCoinInWatchlist) {
  //     removeCoinsToWatchlist(e, ticker, setIsCoinInWatchlist);
  //   } else {
  //     setIsCoinInWatchlist(true);
  //     saveCoinsToWatchlist(e, ticker);
  //   }
  // };
  useEffect(() => {
    const getExchangeData = async () => {
      const coinPrice = await getPriceDataFromBinance(ticker);
      const formatCoinPrice = Number(coinPrice).toFixed(2);
      setBinanceCoinPrice(formatCoinPrice);
    };

    getExchangeData();
  },[]);

  useEffect(() => {
    if (usdKrw && binanceCoinPrice) { // 둘 다 유효할 때만 계산
      const usdKrwNumber = Number(usdKrw.replace(/,/g, ''));
      const binancePriceNumber = Number(binanceCoinPrice);
      setConvertedPrice((usdKrwNumber * binancePriceNumber).toFixed(2)); // 계산 결과를 상태에 저장
    } else {
      setConvertedPrice(''); // 초기화
    }
  }, [usdKrw, binanceCoinPrice]); // usdKrw 또는 binanceCoinPrices가 변경될 때마다 실행
  

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
        <Td>{convertedPrice}</Td>
        <Td>{upbitPrice}</Td>
        <Td isNumeric>{change}%</Td>
        <Td isNumeric>{formatVolume} 억</Td>
        <Td isNumeric> wait</Td>
      </Tr>
    </>
  )
}

export default TableItem