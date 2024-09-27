import React, { useEffect } from 'react';

const Widget = () => {
  useEffect(() => {
    // 스크립트가 이미 추가되었는지 확인
    if (document.getElementById('tradingview-widget-script')) return;

    const script = document.createElement('script');
    script.id = 'tradingview-widget-script'; // 스크립트의 ID 설정
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { description: 'USD to KRW', proName: 'FX_IDC:USDKRW' },
        { description: 'USD to JPY', proName: 'FX:USDJPY' },
        { description: 'GOLD', proName: 'TVC:GOLD' }
      ],
      isTransparent: false,
      showSymbolLogo: true,
      colorTheme: 'dark',
      locale: 'en'
    });

    document.getElementById('tradingview-widget-container').appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
        </a>
      </div>
    </div>
  );
};

export default Widget;