import React, { useEffect, useRef, memo } from 'react';

function BtcKrwBtcUsdtChart() {
  // const container = useRef();
  const containerRef = useRef(null);

  useEffect(
    () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "width": "600",
          "height": "400",
          "symbol": "BITHUMB:BTCKRW/BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Asia/Seoul",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "backgroundColor": "rgba(0, 0, 0, 1)",
          "gridColor": "rgba(255, 255, 0, 0.06)",
          "hide_top_toolbar": true,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      containerRef.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(BtcKrwBtcUsdtChart);