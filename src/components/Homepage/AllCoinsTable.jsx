// import { useEffect,useState } from 'react';
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
// import { getPriceDataFromUpbit } from '../../functions/getPriceDataFromUpbit';
import TableData from './TableData';
import TableHeader from './TableHeader';

const AllCoinsTable = ({ coinData }) => {
  // const [coinData, setCoinData] = useState([]);
  console.log(coinData);

  // useEffect(() => {
  //   upbitMarketData();
  // },[]);
  
  // const upbitMarketData = async () => {
  //   const data = await getPriceDataFromUpbit();
  //   console.log(data);

  //   setCoinData(data);
  // };
  
  return (
    <TableContainer>
      <TableHeader />
      
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
            </Tr>
            {coinData.map((data, index) => {
              return(
                  <TableData key={index} data={data}/>
              )
            })}  
          </Tbody>
          
      </Table>
    </TableContainer>
  )
}

export default AllCoinsTable