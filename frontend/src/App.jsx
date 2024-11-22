import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './Pages/HomePage'
import ChartPage from './Pages/ChartPage'
import MarketcapPage from './Pages/MarketcapPage'
import { lazy, Suspense } from 'react'

// 코드 스플릿, 


// home 은 lazy 의미 업슴ㄴ 
// const HomePage = lazy(() => import('./Pages/HomePage'));
// const ChartPage = lazy(() => import('./Pages/ChartPage'));
// const MarketcapPage = lazy(() => import('./Pages/MarketcapPage'));

function App() {
  return(
    <div className='bg-[#131313] font-sans'>
      <ChakraProvider>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/chart' element={<ChartPage />} />
          <Route path='/marketcap' element={<MarketcapPage />} />
          
          {/* Catch all routes */}
          <Route path='/*' element={<Navigate to='/' replace />} />
        </Routes>
        </Suspense>
        <Footer />
      </ChakraProvider>
    </div>
  )
}

export default App
