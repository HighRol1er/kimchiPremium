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