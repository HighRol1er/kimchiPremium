import { Tr,Td } from '@chakra-ui/react';
import { UsdKrwContext } from '../../context/exchangeContext';
import { useContext, useEffect, useState } from 'react';
import { formatBinancePriceToLocale, formatChangeRate, formatDollarToWon, formatKimchiPremium, formatTradeVolume } from '../../functions/formatCryptoData';

const TableItems = ({ coin }) => {
  const { usdKrwPrice } = useContext(UsdKrwContext);

  const [ binancePriceInWon, setBinancePriceInWon ] = useState();
  // console.log("binancePriceInWon>>>",binancePriceInWon);
  const [ kimchiPremium, setKimchiPremium] = useState({});
  // console.log(kimchiPremium);
  const upbitPrice = coin.trade_price.toLocaleString();
  const binanceDollar = formatBinancePriceToLocale(coin.binance_price);
  const changeRate = formatChangeRate(coin.signed_change_rate);
  const tradeVolume = formatTradeVolume(coin.acc_trade_price_24h);
  useEffect(() => {
    if(usdKrwPrice && coin.binance_price) {
      const binancePriceToWon = formatDollarToWon(coin.binance_price, usdKrwPrice);

      const premium = formatKimchiPremium(binancePriceToWon,upbitPrice);

      setBinancePriceInWon(binancePriceToWon);
      setKimchiPremium(premium);
    }
  },[usdKrwPrice]);
  
  return (
    <>
      <Tr>
        <Td>{coin.market.replace("KRW-", "")}</Td>
        <Td>{binanceDollar}</Td>
        <Td>{binancePriceInWon}</Td>
        <Td>{upbitPrice}</Td>
        <Td isNumeric>{changeRate} %</Td>
        <Td isNumeric>{tradeVolume} 억</Td>
        <Td isNumeric>
          {kimchiPremium.difference}
          ({kimchiPremium.percentage} %)
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