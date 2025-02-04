import { useEffect, useState } from 'react'

const useWatchlist = (coin) => {
  const [watchList, setWatchList] = useState([]);
  const [isWatchlist, setIsWatchlist] = useState(false);

  useEffect(() => {
    const favoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
    // some() 배열에서 특정 조건을 만족하는 요소가 하나 이상 있는지 확인
    const isCoinFavorite = favoriteCoins.some(favCoin => favCoin.market === coin.market);
    // setIsWatchlist(isCoinFavorite);
  }, [coin]);

  const handleWatchlist = () => {
    const getWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const coinIndex = getWatchlist.findIndex(watch => watch.market === coin.market);
  
    if (coinIndex === -1) {
      getWatchlist.push(coin);
      setIsWatchlist(true);
    } else {
      getWatchlist.splice(coinIndex, 1);
      setIsWatchlist(false);
    }
    localStorage.setItem('favoriteCoins', JSON.stringify(getWatchlist));
  }

  return {
    isWatchlist,
    setIsWatchlist,
    handleWatchlist,
  };
}

export default useWatchlist;