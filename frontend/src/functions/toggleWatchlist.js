// 이거 커스텀 훅으로 만들어야겠다. 



export const toggleWatchlist = (coin) => {
  const favoriteCoins = JSON.parse(localStorage.getItem('favoriteCoins')) || [];
  //
  const coinIndex = favoriteCoins.findIndex(favCoin => favCoin.market === coin.market);

  // 즐겨찾기 항목에 없을 경우 추가하기
  if (coinIndex === -1) {
    favoriteCoins.push(coin);
    setIsFavorite(true);
  } else {
    favoriteCoins.splice(coinIndex, 1);
    setIsFavorite(false);
  }
  localStorage.setItem('favoriteCoins', JSON.stringify(favoriteCoins));
}