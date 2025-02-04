import React, { useEffect, useRef, memo } from 'react';

const TradingViewChart = ({width, height, symbol}) => {
  const containerRef = useRef();

  useEffect(
    () => {
      if(containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${symbol}",
          "interval": "D",
          "timezone": "Asia/Seoul",
          "theme": "dark",
          "style": "1",
          "locale": "en",
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
        </a>
      </div>
    </div>
  )
}

export default memo(TradingViewChart);
// export default TradingViewChart