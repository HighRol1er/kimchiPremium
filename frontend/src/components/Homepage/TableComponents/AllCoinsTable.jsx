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

// import btc from "../../assets/btcforproject.svg";
import btc from '../../../assets/btcforproject.svg';
import TableItem from './TableItem';
// import { getPriceDataFromUpbit } from '../../functions/getPriceDataFromUpbit';


const AllCoinsTable = ({ allCoinDataFromUpbit }) => {
  // const [coinData, setCoinData] = useState([]);
  // console.log(coinData);

  // useEffect(() => {
  //   upbitMarketData();
  // },[]);
  
  // const upbitMarketData = async () => {
  //   const data = await getPriceDataFromUpbit();
  //   console.log(data);

  //   setCoinData(data);
  // };

  
  // console.log(allCoinDataFromUpbit);
  return (
    // <TableContainer>

      
    //   <Table variant='striped' colorScheme='whiteAlpha' size='sm'>
    //       <Thead>
    //         <Tr>
    //           <Th className=''>
    //             
    //           </Th>

    //         </Tr>
            
    //       </Thead>

    //       <Tbody>
    //         
            // {allCoinDataFromUpbit.map((data, index) => {
            //   return(
            //       <TableData key={index} data={data}/>
            //   )
            // })}
    //       </Tbody>
          
    //   </Table>
    // </TableContainer>
    <TableContainer>
  <Table variant='striped' colorScheme='whiteAlpha' size='sm'>
    <Thead>
      <Tr>
        <Th><ul className='text-white pl-6'>코인</ul></Th>
        <Th><ul className='text-white'>Binance($)</ul></Th>
        <Th><ul className='text-white'>Binance(￦)</ul></Th>
        <Th><ul className='text-white'>Upbit(￦)</ul></Th>
        <Th isNumeric><ul className='text-white'>등락(%)</ul></Th>
        <Th isNumeric><ul className='text-white'>거래량</ul></Th>
        <Th isNumeric><ul className='text-white pr-6'>프리미엄(￦)</ul></Th>
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
        <Td>84,987,000</Td>
        <Td isNumeric>0.43%</Td>
        <Td>1,505억</Td>
        <Td isNumeric>-2,727 (-0.08%)</Td>
      </Tr>
      {/** Tr 태그를 map으로 돌려줘야함 */}
      {allCoinDataFromUpbit.map((coinData, index) => (
        <TableItem key={index} coinData={coinData} />
      ))}
    </Tbody>

  </Table>
</TableContainer>
  )
}

export default AllCoinsTable