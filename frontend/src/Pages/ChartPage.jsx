// import FetchChart from "../components/Chartpage/FetchChart"
import TradingViewChart from "../components/common/TradingViewChart"
TradingViewChart

const ChartPage = () => {
  return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <TradingViewChart width={1800} height={900} symbol={"BINANCE:BTCUSDT"}/>
      </div>
  )
}

export default ChartPage