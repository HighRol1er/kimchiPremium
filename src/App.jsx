import { ChakraProvider } from '@chakra-ui/react'
import Footer from "./components/Footer"
import Header from './components/header/Header'


function App() {
  return(
    <div className='bg-gray-950 font-sans'>
      <ChakraProvider>
        <Header />
        {/* <Footer /> */}
      </ChakraProvider>
    </div>
  )
}

export default App
