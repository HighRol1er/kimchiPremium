import React, { useEffect, useRef } from 'react';

const TickerTapeWidgetFromTradingView = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current.childNodes.length === 0) {  // 이미 위젯이 추가된 경우 방지
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
          { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
          { description: "DOLLAR Index", proName: "CAPITALCOM:DXY" },
          { description: "Gold", proName: "TVC:GOLD" },
          { description: "US Oil", proName: "TVC:USOIL" }
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: "adaptive",
        colorTheme: "light",
        locale: "en"
      });
      widgetRef.current.appendChild(script);
    }
  }, []);  // 빈 배열을 두 번째 인자로 전달하여 한 번만 실행

  return (
    <div className="sticky top-0 z-10">
      <div ref={widgetRef} className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"></a>
      </div>
    </div>
  );
}

export default TickerTapeWidgetFromTradingView