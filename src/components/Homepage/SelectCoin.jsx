import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AllCoinsTable from './AllCoinsTable'

const SelectCoin = () => {
  return (
    <div className='max-w-screen-xl mx-auto text-white'>

      <Tabs isFitted variant='line' size='lg'>
      <TabList mb='1em'>
        <Tab>전체</Tab>
        <Tab>관심</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {/* <p>one!</p> */}
          <AllCoinsTable />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </div>
  )
}

export default SelectCoin