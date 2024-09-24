import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import btc from "../../assets/btcforproject.svg";
import upbitLogo from "../../assets/logo_upbit.svg";
import binanceLogo from "../../assets/logo_binance.svg";

import { Link } from 'react-router-dom';
const AllCoinsTable = () => {
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
            {/* <Td p="0" ><img style={{ width: '20px', height: '20px' }} src={btc} alt="" /></Td> */}
              <Td>
                <div className='flex gap-1 items-center'>
                  <img style={{ width: '16px', height: '16px' }} src={btc} alt="" />
                  BTC
                </div>
              </Td>
              <Td>63,816.81</Td>
              <Td>84,987,000</Td>
              <Td>0.43%</Td>
              <Td>1,505억</Td>
              <Td>114,213(0.14%)</Td>
            </Tr>
            <Tr>
              <Td>ETH</Td>
              <Td>2,641.25</Td>
              <Td>3,519,000</Td>
              <Td>-0.54%</Td>
              <Td>501억</Td>
              <Td>7,113(0.20%)</Td>
            </Tr>
            <Tr>
              <Td>SOL</Td>
              <Td>346.90</Td>
              <Td>461,950</Td>
              <Td>1.04%</Td>
              <Td>48억</Td>
              <Td>839.0 (0.18%)</Td>
            </Tr>
          </Tbody>
          
      </Table>
    </TableContainer>
  )
}

export default AllCoinsTable