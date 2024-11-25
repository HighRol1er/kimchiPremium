import { Tr,Td } from '@chakra-ui/react';
import { UsdKrwContext } from '../../context/exchangeContext';
import { useContext, useEffect, useState } from 'react';
import { formatBinancePriceToLocale, formatChangeRate, formatDollarToWon, formatKimchiPremium, formatTradeVolume } from '../../functions/formatCryptoData';
import { FaStar } from 'react-icons/fa6';

const TableItems = ({ coin }) => {
  const { usdKrwPrice } = useContext(UsdKrwContext);

  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태

  const [ binancePriceInWon, setBinancePriceInWon ] = useState();
  // console.log("binancePriceInWon>>>",binancePriceInWon);
  const [ kimchiPremium, setKimchiPremium] = useState({});
  // // console.log(kimchiPremium);
  // const upbitPrice = coin.trade_price ? coin.trade_price.toLocaleString() : 'Loading...'; // 기본값 추가
  // // const upbitPrice = coin.trade_price.toLocaleString();
  // const binanceDollar = formatBinancePriceToLocale(coin.binance_price);
  // const changeRate = formatChangeRate(coin.signed_change_rate);
  // const tradeVolume = formatTradeVolume(coin.acc_trade_price_24h);

    // coin이 null이거나 trade_price가 없을 경우 기본값을 처리
    const upbitPrice = coin?.trade_price ? coin.trade_price.toLocaleString() : '정보 없음'; // '정보 없음' 기본값 추가

    const binanceDollar = coin?.binance_price ? formatBinancePriceToLocale(coin.binance_price) : '정보 없음';
    const changeRate = coin?.signed_change_rate ? formatChangeRate(coin.signed_change_rate) : '정보 없음';
    const tradeVolume = coin?.acc_trade_price_24h ? formatTradeVolume(coin.acc_trade_price_24h) : '정보 없음';
  

  // 로컬 스토리지에 저장된 즐겨찾기 상태 확인
  useEffect(() => {
    const favoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
    const isCoinFavorite = favoriteCoins.some(favCoin => favCoin.market === coin.market);
    setIsFavorite(isCoinFavorite);
  }, [coin.market]);

  useEffect(() => {
    if(usdKrwPrice && coin.binance_price) {
      const binancePriceToWon = formatDollarToWon(coin.binance_price, usdKrwPrice);

      const premium = formatKimchiPremium(binancePriceToWon,upbitPrice);

      setBinancePriceInWon(binancePriceToWon);
      setKimchiPremium(premium);
    }
  },[usdKrwPrice]);

  const toggleFavorite = () => {
    const favoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
    const coinIndex = favoriteCoins.findIndex(favCoin => favCoin.market === coin.market);

    if (coinIndex === -1) {
      favoriteCoins.push(coin);
      setIsFavorite(true);
    } else {
      favoriteCoins.splice(coinIndex, 1);
      setIsFavorite(false);
    }

    localStorage.setItem('favoriteCoins', JSON.stringify(favoriteCoins));
  }
  
  return (
    <>
      <Tr>
        <Td className='flex gap-1'>
          <FaStar onClick={toggleFavorite} style={{ color: isFavorite ? 'yellow' : 'gray' }}/>
          {/* {coin.market.replace("KRW-", "")}*/}
          {coin?.market?.replace("KRW-", "") || '정보 없음'}
        </Td>
        <Td>{binanceDollar}</Td>
        <Td>{binancePriceInWon}</Td>
        <Td>{upbitPrice}</Td>
        <Td isNumeric>{changeRate} %</Td>
        <Td isNumeric>{tradeVolume} 억</Td>
        <Td isNumeric>
          {/* {kimchiPremium.difference}
          ({kimchiPremium.percentage} %) */}
          {kimchiPremium.difference || '정보 없음'}
          ({kimchiPremium.percentage || '정보 없음'} %)
        </Td>
      </Tr>
      {/* <Tr>
        <Td>{binancePriceInWon}</Td>
        <Td>{coin.tp}</Td>
        <Td isNumeric>{coin.atp24h}</Td>
        <Td isNumeric></Td>
      </Tr> */}
    </>
  )
}

export default TableItems