import btc from "../../assets/btcforproject.svg";
import upbitLogo from "../../assets/logo_upbit.svg";
import binanceLogo from "../../assets/logo_binance.svg";
import { Link } from "react-router-dom";

const TableHeader = () => {
  return (
    <div className='flex gap-8'>
        <div className='flex flex-col items-center'>
          <div>기준거래소</div> {/*환율 못구하면 삭제해야지...ㅠㅠ */}
          <Link to="https://upbit.com/home">
            <img style={{ width: '48px', height: '48px' }} src={upbitLogo} alt='' />
          </Link>
          <div>Upbit</div>
        </div>
        <div className='flex flex-col items-center'>
          <div>비교거래소</div> {/*환율 못구하면 삭제해야지...ㅠㅠ */}
          <Link to="https://www.binance.com/en">
            <img style={{ width: '48px', height: '48px' }} src={binanceLogo} alt='' />
          </Link>
          <div>Binance</div>
        </div>
      </div>
  )
}

export default TableHeader