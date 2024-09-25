import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import btc from "../../assets/btcforproject.svg";
import upbitLogo from "../../assets/logo_upbit.svg";
import binanceLogo from "../../assets/logo_binance.svg";
import { getMarketDataFromUpbit } from '../../functions/getMarketDataFromUpbit';
import { getPriceDataFromBinance } from '../../functions/getPriceDataFromBinance';
import { getPriceDataFromUpbit } from '../../functions/getPriceDataFromUpbit';
import TableData from './TableData';

const AllCoinsTable = () => {
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    upbitMarketData();
  },[]);
  
  const upbitMarketData = async () => {
    const data = await getPriceDataFromUpbit();
    // console.log(data);

    setCoinData(data);
  };
  
  return (
    <TableContainer>
      <div className='flex gap-8'>
        <div className='flex flex-col items-center'>
          <div>기준거래소</div>
          <Link to="https://upbit.com/home">
            <img style={{ width: '48px', height: '48px' }} src={upbitLogo} alt='' />
          </Link>
          <div>Upbit</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>비교거래소</div>
          <Link to="https://www.binance.com/en">
            <img style={{ width: '48px', height: '48px' }} src={binanceLogo} alt='' />
          </Link>
          <div>Binance</div>
        </div>
      </div>
      
      <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th>
                <div className='pl-6'>
                코인
                </div>
              </Th>
              <Th>Binance($)</Th>
              <Th>Upbit(￦)</Th>
              <Th>등락(%)</Th>
              <Th>거래량</Th>
              <Th>김치프리미엄(￦)</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>
                <div className='flex gap-1 items-center'>
                  <img style={{ width: '16px', height: '16px' }} src={btc} alt="" />
                  Example
                </div>
              </Td>
              <Td><div>63,816.81</div></Td>
              <Td>84,987,000</Td>
              <Td>0.43%</Td>
              <Td>1,505억</Td>
              <Td>114,213(0.14%)</Td>
            </Tr>
            {/* NOTE: Tr 태그 안에 있는거 한방에 map()으로 돌리는게 맞는듯*/}
            {/* {coinTickers.map((ticker, index) => { */}
              {/* return ( */}
                {/* <Tr> */}
                  {/* <Td key={index}>{ticker}</Td> */}
                  {/* <Td>{binancePrices[ticker] !== undefined ? binancePrices[ticker] : ''}</Td> */}
                  {/* <Td>{upbitPrices[ticker] !== undefined? upbitPrices[ticker] : ''}</Td> */}
                {/* </Tr> */}
                {/* ) */}
              {/* })} */}

            {coinData.map((data, index) => {
              // const ticker = data.market.replace('KRW-','');
              return(
                  <TableData data={data}/>
              )
            })}  
          </Tbody>
          
      </Table>
    </TableContainer>
  )
}

export default AllCoinsTable