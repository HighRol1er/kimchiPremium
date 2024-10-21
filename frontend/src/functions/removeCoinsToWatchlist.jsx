export const removeCoinsToWatchlist = (e, ticker, setIsCoinInWatchlist) => {
  e.preventDefault();
  let watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const newList = watchlist.filter((coin) => coin !== ticker);
  setIsCoinInWatchlist(false);
  localStorage.setItem("watchlist", JSON.stringify(newList));
}