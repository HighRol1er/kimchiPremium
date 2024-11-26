import { Tr,Td } from '@chakra-ui/react';
import { UsdKrwContext } from '../../context/exchangeContext';
import { useContext, useEffect, useState } from 'react';
import { formatBinancePriceToLocale, formatChangeRate, formatDollarToWon, formatKimchiPremium, formatTradeVolume } from '../../functions/formatCryptoData';
import { FaStar } from 'react-icons/fa6';
import useWatchlist from '../../hooks/useWatchlist';

const TableItems = ({ coin, onFavoriteChange  }) => {
  const { usdKrwPrice } = useContext(UsdKrwContext);
  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태
  const [ binancePriceInWon, setBinancePriceInWon ] = useState();
  const [ kimchiPremium, setKimchiPremium] = useState({});
  // console.log("binancePriceInWon>>>",binancePriceInWon);

   // coin이 null이거나 trade_price가 없을 경우 기본값을 처리
  const upbitPrice = coin?.trade_price ? coin.trade_price.toLocaleString() : ' '; // '정보 없음' 기본값 추가
  const binanceDollar = coin?.binance_price ? formatBinancePriceToLocale(coin.binance_price) : ' ';
  const changeRate = coin?.signed_change_rate ? formatChangeRate(coin.signed_change_rate) : ' ';
  const tradeVolume = coin?.acc_trade_price_24h ? formatTradeVolume(coin.acc_trade_price_24h) : ' ';
  

  // 로컬 스토리지에 저장된 즐겨찾기 상태 확인
  useEffect(() => {
    const favoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
    const isCoinFavorite = favoriteCoins.some(favCoin => favCoin.market === coin.market);
    
    setIsFavorite(isCoinFavorite);
  }, [coin]);

  useEffect(() => {
    if(usdKrwPrice && coin.binance_price) {
      const binancePriceToWon = formatDollarToWon(coin.binance_price, usdKrwPrice);

      const premium = formatKimchiPremium(binancePriceToWon,upbitPrice);

      setBinancePriceInWon(binancePriceToWon);
      setKimchiPremium(premium);
    }
  },[usdKrwPrice, coin?.binance_price]);

  const toggleFavorite = () => {
    const favoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
    // const coinIndex = favoriteCoins.findIndex(favCoin => favCoin.market === coin.market);

    // let updatedFavorites;
    // if (coinIndex === -1) {
    //   favoriteCoins.push(coin);
    //   // updatedFavorites = [...favoriteCoins, coin];
    //   setIsFavorite(true);
    // } else {
    //   favoriteCoins.splice(coinIndex, 1);
    //   // updatedFavorites = favoriteCoins.filter(favCoin => favCoin.market !== coin.market);
    //   setIsFavorite(false);
    // }

    // localStorage.setItem('favoriteCoins', JSON.stringify(favoriteCoins));
    const updatedFavorites = favoriteCoins.filter(favCoin => favCoin.market !== coin.market);

    if (!isFavorite) {
      updatedFavorites.push(coin);
    }

    localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);

    if (onFavoriteChange) {
      onFavoriteChange(updatedFavorites);
    }
  }
  
  return (
    <>
      <Tr>
        <Td className='flex gap-1'>
          <FaStar onClick={toggleFavorite} style={{ color: isFavorite ? 'yellow' : 'gray' }}/>
          {/* <FaStar onClick={handleWatchlist} style={{ color: iswatchlist ? 'yellow' : 'gray' }}/> */}
          {coin?.market?.replace("KRW-", "") || ' '}
        </Td>
        <Td>{binanceDollar}</Td>
        <Td>{binancePriceInWon}</Td>
        <Td>{upbitPrice}</Td>
        <Td isNumeric className={`${changeRate < 0 ? 'text-red-400' : 'text-green-300'}`} > {changeRate} %</Td>
        <Td isNumeric>{tradeVolume} 억</Td>
        <Td isNumeric className={`${kimchiPremium.percentage < 0 ?'text-red-400' : 'text-green-300'}`}>
          {kimchiPremium.difference || ' '}
          {kimchiPremium.percentage ? `${kimchiPremium.percentage} %` : ' '} 
        </Td>
      </Tr>
    </>
  )
}

export default TableItems