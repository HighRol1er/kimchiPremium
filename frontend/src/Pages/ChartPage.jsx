import TradingViewChart from "../components/common/TradingViewChart"
TradingViewChart

const ChartPage = () => {
  return (
      <div className="flex items-start justify-center min-h-screen w-full ">
        <div className="h-[600px] w-full">
          <TradingViewChart symbol={"BINANCE:BTCUSDT"}/>
        </div>
      </div>
  )
}

export default ChartPage