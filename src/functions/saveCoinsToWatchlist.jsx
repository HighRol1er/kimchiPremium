export const saveCoinsToWatchlist = (e, ticker) => {
  e.preventDefault();

  let watchlist = JSON.parse(localStorage.getItem("watchlist"));

  if(watchlist) {
    if(!watchlist.includes(ticker)) {
      watchlist.push(ticker);
    } 
  } else {
    watchlist = [ticker];
  }
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}