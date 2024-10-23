import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import TableItem from '../TableComponents/TableItem';


const WatchListCoinsTable = ({ allCoinDataFromUpbit, usdKrw }) => {
  return (
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
          {allCoinDataFromUpbit.map((coinData, index) => (
            <TableItem key={index} coinData={coinData} usdKrw={usdKrw} />
          ))}  
          </Tbody>
          
      </Table>
    </TableContainer>
    
  )
}

export default WatchListCoinsTable