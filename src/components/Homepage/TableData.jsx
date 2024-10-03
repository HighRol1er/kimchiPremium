import { Tr, Td } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getPriceDataFromBinance } from '../../functions/getPriceDataFromBinance';
import { saveCoinsToWatchlist } from '../../functions/saveCoinsToWatchList';

import { FaRegStar } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';
import { removeCoinsToWatchlist } from '../../functions/removeCoinsToWatchlist';

const TableData = ({data }) => {
  const [binancePrices, setBinancePrices] = useState({});

  const watchlist =JSON.parse(localStorage.getItem("watchlist"));
  const ticker = data.market.replace('KRW-','');
  
  const [isCoinInWatchlist, setIsCoinInWatchlist] = useState(watchlist?.includes(ticker));
  
  const percentage = (Number(data.signed_change_rate)* 100).toFixed(2);
  const volume = (Number(data.acc_trade_price_24h) / 100_000_000).toFixed(0);
  const formatVolume = volume.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  // TODO: 이렇게 API를 호출하니깐 지금 CORS에러가 나오는데 이거 Next.js나 Express.js를 따로 설정해야할 듯.


  const getBinancePrices = async (ticker) => {
    const pricesData = {};
    const price = await getPriceDataFromBinance(ticker);
    pricesData[ticker] = price;

    setBinancePrices(pricesData);
  };

  const checkWatchlist = (e) => {
    if(watchlist) {
      setIsCoinInWatchlist(prev => !prev);
    } else {
      setIsCoinInWatchlist(prev => !prev);
    }
    if(isCoinInWatchlist) {
      removeCoinsToWatchlist(e, ticker, setIsCoinInWatchlist);
    } else {
      setIsCoinInWatchlist(true);
      saveCoinsToWatchlist(e, ticker);
    }
  };

  useEffect(() => {
    getBinancePrices(ticker);
  },[ticker])
  

  return (
    <>
        <Tr>
          <Td >
            <div onClick={checkWatchlist} className="flex">
              {isCoinInWatchlist ? (
                <span className='text-yellow-400 pr-2 '><FaStar /></span>
              ) : (<span className='pr-2'><FaStar /></span>)}
              {ticker}
            </div>
          </Td>
          <Td>{binancePrices[ticker]}</Td>
          <Td>{data.trade_price}</Td>
          <Td>{percentage}%</Td>
          <Td>{formatVolume} 억</Td> 
        </Tr>
    </>
  )
}

export default TableData