import { Tr, Td } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// import { getPriceDataFromBinance } from '../../functions/getPriceDataFromBinance';
// import { saveCoinsToWatchlist } from '../../functions/saveCoinsToWatchList';

import { FaRegStar } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';
// import { removeCoinsToWatchlist } from '../../functions/removeCoinsToWatchlist';

const TableItem = ({ coinData }) => {
  // const [binancePrices, setBinancePrices] = useState({});
  
  // const watchlist =JSON.parse(localStorage.getItem("watchlist"));
  
  // const [isCoinInWatchlist, setIsCoinInWatchlist] = useState(watchlist?.includes(ticker));
  
  const ticker = coinData.market.replace('KRW-','');
  const upbitPrice = coinData.trade_price.toLocaleString();
  const change = (Number(coinData.signed_change_rate)* 100).toFixed(2);
  const volume = (Number(coinData.acc_trade_price_24h) / 100_000_000).toFixed(0);
  const formatVolume = volume.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  // const getBinancePrices = async (ticker) => {
  //   const pricesData = {};
  //   const price = await getPriceDataFromBinance(ticker);
  //   pricesData[ticker] = price;

  //   setBinancePrices(pricesData);
  // };

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

  // useEffect(() => {
  //   getBinancePrices(ticker);
  // },[ticker])
  console.log(coinData);

  return (
    <>
{/* 
            <div onClick={checkWatchlist} className="flex">
              {isCoinInWatchlist ? (
                <span className='text-yellow-400 pr-2 '><FaStar /></span>
              ) : (<span className='pr-2'><FaStar /></span>)}
              {ticker}
            </div> */}

      <Tr>
        <Td>
          <div className='flex'>
          <FaStar className='text-yellow-400 mr-2'/>
          {ticker}
          </div>
        </Td>
        <Td>wait</Td>
        <Td>wait</Td>
        <Td>{upbitPrice}</Td>
        <Td isNumeric>{change}%</Td>
        <Td isNumeric>{formatVolume} 억</Td>
        <Td isNumeric> wait</Td>
        
      </Tr>
    </>
  )
}

export default TableItem