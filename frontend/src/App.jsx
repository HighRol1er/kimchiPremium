import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './Pages/HomePage'
import ChartPage from './Pages/ChartPage'
import MarketcapPage from './Pages/MarketcapPage'
import { UsdKrwProvider } from './context/exchangeContext'

function App() {
  return(
    <div className='bg-[#131313] font-sans'>
      <ChakraProvider>
        <UsdKrwProvider>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/chart' element={<ChartPage />} />
            <Route path='/marketcap' element={<MarketcapPage />} />
              
              {/* Catch all routes */}
            <Route path='/*' element={<Navigate to='/' replace />} />
          </Routes>
          <Footer />
        </UsdKrwProvider>
      </ChakraProvider>
    </div>
  )
}

export default App
