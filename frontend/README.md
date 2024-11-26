#### Oct/20 
1. Footer 밑에 흰색 공백 제거하기 : o 
2. 변수 함수 이름 재정리 하나씩 보이는거 정리해서 밑에 뭐뭐 바뀌었는지 적기 
  2-1 반복되는 부분(Header/HeaderComponents/) CurrencyPriceItem.jsx 반복되는 코드 컴포넌트화
3. socket.io 때문에 백엔드 쓰는김에 API부분은 확실하게 다보내주자. 

#### Oct/21
1. 오늘 백엔드 코드 작성했음 (Express.js)
2. 반복되는 코드는 컴포넌트화 했음 
3. 달러, 엔 Google API 이용해서 가져왔음 
4. TODO: 아직 테더는 안가져옴 테더는 KRW-USDT랑 USDT-USD 환율 둘다 가져올 예정. <완료>
5. TODO: 백엔드도 Route 별로 나눠서 해야지 지금 server.js에 다 작성해놔서 어지러워진다. <완료>
6. 일단 커밋하자.

#### Oct/22
1. Header에서 보여주는 가격 데이터는 다 됐다.
2. Header에서 고칠건 이제 Tradingview widget코드 어떻게하면 좀 더 디벨롭할 수 있을지정도? <-Tradingview widget코드들 손볼 때 대 같이 보자.
3. Header/CurrencyPrice.jsx에서 비동기 함수들 Promise.all 써서 병렬실행 할 것 << 이게 더 좋음 
4. HomePage에서 불러오는 SelectCoin.jsx 이거 컴포넌트명 바꿔야 될듯 CoinList?정도
4.1 SelectCoin -> CoinTabs.jsx로 변경
5. Homepage안에 각 컴포넌트별로 나눔 쓰임새 별로 Tabs에서 쓰이는건 같은 위치 Table에서 쓰이는건 Table에
6.TODO: Binance에서 가격 가져오기 <완료>
7.TODO: Binance에서 가져온거 달러*테더로 원화 가격, 프리미엄도 구하고.. 내일까지 하기 <완료>
8.TODO: 즐찾기능 다시 구현하기 ( 저번에 즐찾하면 바로 적용이 안됐음 즐찾 즐삭이 바로바로되게끔) <NOT>
 -> **내일 TableItem부터다시 시작** 커밋하자!
9. TODO:backend / exchangePrice.js <NOT>
-> ticker가 업비트에는 존재하지만 바이낸스에는 없을 수 있기 때문에 예외 처리를 해줘야 함
10. TableItem.jsx/binance(￦) :  달러 * binance($)	해야되는데 props로 내릴 수가 없네 WTF 리덕스 마렵다.. 
11. binance(￦)이거 코드 내일 다시보자 코드 쓰레기같네.. ㅇㅅㅇ

#### Oct/23
1. 즐찾기능 
 1.1 내가 생각한 로직 TableItem에서 local storage로 넣고 그걸 상위 컴포넌트에서 불러와서 랜더링을해야함 
 근데 문제는 지금 랜더링이 안일어나.. ㅠㅠ 일단 디테일한건 나중에하고 러프하게 가자 (기능이 되면 일단 넘어가)
2. Chat box 꾸미기.
3. TODO: 계속 채팅치면 스크롤이 생길줄 알았는데 아니네 그냥 계속 내려박네 ㅋㅋ element 계속생성된다. <완료>

#### Oct/24
1 . 채팅에서 이름 바꾸는거 세팅해쓰~~ 나이쓰~!!!

#### 11/24 
1.TradingViewChart.jsx에 굳이 memo를 써야할 필요가 없다
why : 어차피 첫 렌더링때 그려지는 UI이기 때문. 

2. 내가 데이터를 테이블 표로 정리하기 위해 필요한 것 
  2-1 upbit webSocket에서 가져와야 할 데이터. 

  Ticker : code(cd)

  Binance $ : 
  Binance ￦:

  upbit : trade_price(tp)
  등락 :  signed_change_rate(scr)
  거래량 : acc_trade_price_24h(atp24h)

  프리미엄 : 

3. 객체 데이터가 
{},{}, ... ,{} <-이렇게 100개 넘게 들어오는데 이걸 해당 필요한 정보만 빼내기엔 좀 그렇고...
-> 결과.
처음엔 객체로 하나씩 다시 만들라 했음 포멧은 아래와 같음 
근데? 굳이 이걸 객체로 할 필요가 없는게 어차피 업비트 코인 개수가 정해져있음 
그럴바엔 처음에 아예 할당할 때 정해진 배열을 쓰는게 낫지 
굳이 객체로 돌릴 필요가 없는거지 

{ETH : {
  ticker : cd
  trade_price : tp
  changeRate : scr
  trade volume : atp24h
}}

4. 바이낸스 WebSocket을 어떻게 열래? 
  a. 현재 바이낸스 API로 일단 티커를 싹다 불러왔지 -> coinTabs에서 
  b. 그리고 그걸 CoinTable로 props로 내려주고 
  c. 바이낸스 Websocket에서 가져온 데이터를 따로 상태로 관리해 쓰냐?
  아니면 업비트와 바이낸스 데이터를 합치는 구조를 만드냐? 
  -> 왜 합치냐? : 배열을 써서 하게되면 잘못된 구조로 가져올 수 도?? ..;; 
  
  WebSocket에 코인 어떻게 받아올지는 어차피 배열 순서대로 불러온다.
  >> 그러니깐 굳이 데이터를 합칠 필욘 없다. GOOD
  >> 그리고 순서가 바뀔 일도 없다. GOOD! !
  문제가 생김 _WTF_
  바이낸스한테 websocket을 Batch같은 형식으로 보내면 데이터가 안나와 why? => upbit에는 있지만 binance에는 없는 티커가 있음 
  
  그래서 지금 하려는게 binance batch API를 사용할 것임 
  기존에는 하나씩 150개를 보냈었는데 이젠 하나의 요청에 150개의 코인 정보를 요청할 에정 

  그리고 궁금한거 하나가 
  어차피 BE는 FE에서 UI를 그릴때 upbit에게 요청을 하는데
  그걸 BE서버에서 데이터를 저장해놨다가
  FE (req.query에 담아서 보내는 것) -> BE로 binance 데이터 요청해줘 라고 하기전에 이미 받은 요청에 대해서 데이터를 준비해놓고 
  FE -> BE에게 요청이 들어올 때 바로 FE로 쏴주는거.
  >> BE에 정보 저장했다가 binance에게 API 요청을 보내는게 더 효율적 
  >> why? : req.query는 길이 제한이 있을 수 있음, 티커 리스트가 많아지면 문제가 될 수 있어
  >> why2? : 중간 트래픽이 존재하니 이걸 상쇄시킬 수 있음 
  >> why3 : FE코드도 줄일 수 있고 

  #### 11/25
  바이낸스한테 Batch API 요청 보내봤는데 
  업비트에는 존재하나 바이낸스에는 존재하지 않는 티커들이 있어서 유효성 검사를 해줘야함..
  이럴바엔 그냥 WebSocket열어서 하는게 낫나

  1. 차트에 반응형 추가. 
  채팅창도 반응형 됐는데
  문제 : 테이블 표 반응형 어떻게 할지..
  sm: 640px 이상
  md: 768px 이상
  lg: 1024px 이상
  xl: 1280px 이상
  2xl: 1536px 이상

  2. 즐겨찾기 기능 추가했는데
  로직좀 다시 살펴보자 뭔가 이상하다.

  #### 11/26
  나는 작업 할때 하나의 작은 단위로 만들어서 
  기능이 정상 작동하는지 확인하고 붙임 
  -> 이것도 테스트에 관련한 내용으로 적을 수 있을까?
  어후 즐겨찾기 쉽지 않네.. 상태를 위로 끌어올려서 re-render시켜야되는데.. 