
export const convertToBinanceWebSocketFormat = (crypto) => {
  // result : "KRW-BTC" => "btcusdt@ticker"
  const baseCurrency = crypto.replace('KRW-','').toLowerCase();
  return `${baseCurrency}usdt@ticker`;
}

export const formatDollarToWon = (coinPrice, usd) => {
  const price1 = Number(usd.replace(/,/g, ''));
  const price2 = Number(coinPrice);

  const formatFloat = parseFloat((price1 * price2).toFixed(0));
  const formatToLocale = formatFloat.toLocaleString();
  // console.log(typeof(result));

  // return parseFloat(result);
  return formatToLocale;
}

export const formatBinancePriceToLocale = (coinPrice) => {
  const price1 = Number(coinPrice).toFixed(2);
  const formatToLocale = Number(price1).toLocaleString();

  return formatToLocale;
}

export const formatChangeRate = (coinPrice) => {
  const price1 = (Number(coinPrice) * 100).toFixed(2);

  return price1;
}

export const formatTradeVolume = (tradeVolume) => {
  const volume1 = (Number(tradeVolume) / 100_000_000).toFixed(0);
  const result = volume1.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  
  return result;
}

export const formatKimchiPremium = (binancePrice, upbitPrice) => {
  const bPrice = Number(binancePrice.replace(/,/g, '')); // "1,000" -> 1000
  const uPrice = Number(upbitPrice.replace(/,/g, '')); // "1,200" -> 1200

  const difference = uPrice - bPrice;
  const formatDifference = difference.toLocaleString();

  const percentage = ((difference / bPrice) * 100)
  const formatPercentage = percentage.toFixed(2);

  return {
    difference : formatDifference,
    percentage : formatPercentage
  };
}
