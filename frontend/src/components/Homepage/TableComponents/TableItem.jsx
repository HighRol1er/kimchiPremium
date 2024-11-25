import { useEffect, useState } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { getPriceDataFromBinance } from '../../../api/getExchangeData';

const TableItem = ({ coinData, usdKrw }) => {
  const [binanceCoinPrice, setBinanceCoinPrice] = useState();
  const [binanceDollarToWon, setBinanceDollarToWon] = useState('');
  // NOTE:
  const [watchlist, setWatchlist] = useState([]); 
  
  const ticker = coinData.market.replace('KRW-','');
  const upbitPrice = coinData.trade_price.toLocaleString();
  const change = (Number(coinData.signed_change_rate)* 100).toFixed(2);
  const volume = (Number(coinData.acc_trade_price_24h) / 100_000_000).toFixed(0);
  const formatVolume = volume.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
/*
이미 병렬일 수 있음 < 체크요소 
api 자체가 오래걸릴 수 있음 < 체크요소 
로딩 or 스켈레톤 필 수 (ui ux )

api 굳이 한번에 다 될 필요 있나.. 
무한 스크롤( << prefetch랑 연계해서 . )
음...

react query(캐싱) , zustand는 굳이 안써도 < 체크 요소 )
*/ 

    const getExchangeData = async () => {
      const coinPrice = await getPriceDataFromBinance(ticker);
      // console.log(coinPrice);
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

  // const isInWatchlist = (ticker) => {
  //   const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  //   return watchlist.includes(ticker);
  // };
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
  },[])

  // 즐겨찾기 : ticker를 localStorage에 저장
  // const handleWatchlist = () => {
  //   let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  //   if (!watchlist.includes(ticker)) {
  //     // save
  //     watchlist.push(ticker);
  //     localStorage.setItem('watchlist', JSON.stringify(watchlist));
  //     alert(`${ticker} has been added to your watchlist!`);
  //   } else {
  //     // remove
  //     watchlist = watchlist.filter(coin => coin !== ticker);
  //     localStorage.setItem('watchlist', JSON.stringify(watchlist));
  //     alert(`${ticker} has been removed from your watchlist.`);
  //   }
  // };
  const handleWatchlist = () => {
    let updatedWatchlist;

    if (!watchlist.includes(ticker)) {
      // save
      updatedWatchlist = [...watchlist, ticker];
      alert(`${ticker} has been added to your watchlist!`);
    } else {
      // remove
      updatedWatchlist = watchlist.filter((coin) => coin !== ticker);
      alert(`${ticker} has been removed from your watchlist.`);
    }

    setWatchlist(updatedWatchlist); // 상태 업데이트
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist)); // localStorage 업데이트
  };

  return (
    <>
      <Tr>
        <Td>
          <div className='flex'>
          <FaStar 
              className={`mr-2 cursor-pointer ${watchlist.includes(ticker) ? 'text-yellow-400' : 'text-gray-400'}`} 
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