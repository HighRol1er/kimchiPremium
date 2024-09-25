import { Tr, Td } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getPriceDataFromBinance } from '../../functions/getPriceDataFromBinance';

const TableData = ({data}) => {
  const [binancePrices, setBinancePrices] = useState({})
  const ticker = data.market.replace('KRW-','');

  // TODO: 이렇게 API를 호출하니깐 지금 CORS에러가 나오는데 이거 Next.js나 Express.js를 따로 설정해야할 듯.
  const getBinancePrices = async (ticker) => {
    const pricesData = {};
    const price = await getPriceDataFromBinance(ticker);
    pricesData[ticker] = price;

    setBinancePrices(pricesData);
  };

  useEffect(() => {
    getBinancePrices(ticker);
  },[ticker])

  return (
    <Tr>
      <Td>{ticker}</Td>
      <Td>{binancePrices[ticker]}</Td>
      <Td>{data.trade_price}</Td>
      <Td>{data.signed_change_rate}</Td>
      <Td>{data.trade_volume}</Td>
      <Td></Td>
    </Tr>
  )
}

export default TableData