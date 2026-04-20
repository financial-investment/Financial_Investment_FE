# Financial Investment FE 코드 해설서

이 프로젝트는 Vue 3 + Vite로 만든 모의 주식 투자 서비스 프론트엔드입니다.

현재 단계에서는 백엔드 API를 붙이기 전이므로 실제 로그인, 실제 주문 체결, 실제 주식 데이터 조회는 동작하지 않습니다. 대신 `mockData.js`에 있는 임시 데이터를 사용해서 서비스 흐름과 화면 이동을 먼저 구현해둔 상태입니다.

## 1. 디렉토리 구조

```txt
Financial_Investment_FE/
  index.html
  package.json
  vite.config.js
  README.md

  src/
    main.js
    App.vue

    assets/
      base.css
      main.css
      logo.svg

    components/
      AppFooter.vue
      AppNavbar.vue
      HoldingTable.vue
      MarketIndexCard.vue
      MetricCard.vue
      PageShell.vue
      StockListItem.vue
      StockResultCard.vue

      HelloWorld.vue
      TheWelcome.vue
      WelcomeItem.vue
      icons/

    data/
      mockData.js

    views/
      DashboardView.vue
      GuestHomeView.vue
      LoginView.vue
      MyPageView.vue
      OrderView.vue
      PortfolioView.vue
      SearchView.vue
      StockDetailView.vue
      TransactionsView.vue
```

참고: `HelloWorld.vue`, `TheWelcome.vue`, `WelcomeItem.vue`, `components/icons/`는 Vue 기본 템플릿에서 생성된 파일입니다. 현재 서비스 화면에서는 사용하지 않습니다. 나중에 정리해도 됩니다.

## 2. 각 폴더와 파일의 의미

### 루트 파일

`index.html`

Vite 앱이 실제 브라우저에 처음 로드되는 HTML 파일입니다. 보통 직접 수정할 일은 많지 않습니다. Vue 앱은 이 파일 안의 `#app` 영역에 붙습니다.

`package.json`

프로젝트 이름, 사용 중인 라이브러리, 실행 명령어가 들어 있습니다.

주요 명령어:

```sh
npm run dev
npm run build
```

`vite.config.js`

Vite 개발 서버와 빌드 설정 파일입니다. 지금은 기본 설정에 가깝습니다.

### `src/main.js`

Vue 앱의 진입점입니다.

```js
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

흐름은 단순합니다.

1. 전체 CSS를 불러옵니다.
2. Vue 앱을 만듭니다.
3. 최상위 컴포넌트인 `App.vue`를 `index.html`의 `#app`에 연결합니다.

### `src/App.vue`

현재 프로젝트에서 가장 중요한 파일입니다.

아직 `vue-router`를 쓰지 않기 때문에, `App.vue`가 직접 현재 화면 상태를 관리합니다.

주요 상태:

```js
const isLoggedIn = ref(false)
const currentPage = ref('guest-home')
const selectedStockId = ref('samsung')
const orderType = ref('buy')
```

각 상태의 의미:

`isLoggedIn`

현재 사용자가 로그인했다고 볼지 정하는 임시 상태입니다. 실제 소셜 로그인이 아니라 프론트 안에서만 바뀌는 값입니다.

`currentPage`

현재 어떤 화면을 보여줄지 결정합니다. 예를 들어 `guest-home`, `login`, `dashboard`, `portfolio` 같은 문자열이 들어갑니다.

`selectedStockId`

현재 선택된 종목을 기억합니다. 종목 검색 결과에서 삼성전자를 클릭하면 이 값이 `samsung`이 되고, 종목 상세 화면에서 해당 데이터를 보여줍니다.

`orderType`

주문 화면이 매수인지 매도인지 기억합니다. 값은 `buy` 또는 `sell`입니다.

주요 함수:

```js
function navigate(page) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

화면을 이동시키는 함수입니다. 라우터 대신 `currentPage` 값을 바꿔서 다른 화면을 보여줍니다.

```js
function login() {
  isLoggedIn.value = true
  navigate('dashboard')
}
```

임시 로그인 함수입니다. 소셜 로그인 버튼을 누르면 실제 인증 없이 로그인 상태로 바꾸고 대시보드로 이동합니다.

```js
function logout() {
  isLoggedIn.value = false
  navigate('guest-home')
}
```

임시 로그아웃 함수입니다.

```js
function selectStock(stockId) {
  selectedStockId.value = stockId
  navigate(isLoggedIn.value ? 'detail' : 'guest-detail')
}
```

종목을 클릭했을 때 호출됩니다. 로그인 상태라면 로그인 후 상세 페이지로, 비로그인 상태라면 비로그인 상세 페이지로 이동합니다.

### `src/views/`

`views` 폴더는 “하나의 페이지 화면”을 담는 곳입니다.

현재 화면 목록:

`GuestHomeView.vue`

비로그인 상태의 첫 홈 화면입니다. 검색창, 코스피/코스닥/환율, 인기 종목, 뉴스, 시작하기 CTA가 있습니다.

`LoginView.vue`

소셜 로그인 화면입니다. 카카오, 네이버, Google 버튼이 있습니다. 지금은 버튼을 누르면 임시 로그인 처리만 합니다.

`DashboardView.vue`

로그인 후 홈 화면입니다. 시장 지수, 총 자산, 평가 손익, 보유 현금, 나의 포트폴리오, 최근 거래 내역을 보여줍니다.

`SearchView.vue`

종목 검색 화면입니다. 비로그인/로그인 상태에서 함께 사용합니다. `isLoggedIn` 값을 받아 문구와 흐름을 조금 다르게 보여줄 수 있습니다.

`StockDetailView.vue`

종목 상세 화면입니다. 차트, 현재가, 등락률, 호가, 매수/매도 버튼이 있습니다. 비로그인 상태에서는 주문 버튼 대신 로그인 유도 버튼을 보여줍니다.

`OrderView.vue`

주문 화면입니다. 매수 또는 매도 주문 가격, 수량, 예상 금액을 입력하는 화면입니다. 지금은 실제 주문 API 호출 없이 거래 내역 화면으로 이동합니다.

`PortfolioView.vue`

포트폴리오 화면입니다. 총 자산, 평가 손익, 수익률, 보유 현금, 자산 배분, 수익률 추이, 보유 주식 목록을 보여줍니다.

`TransactionsView.vue`

거래 내역 화면입니다. 종목별/거래 유형별/기간별 필터 UI와 거래 내역 리스트가 있습니다.

`MyPageView.vue`

사용자 정보 화면입니다. 이름, 이메일, 가입 방식, 기본 투자 금액 등을 확인하고 수정하는 UI가 있습니다.

### `src/components/`

`components` 폴더는 여러 화면에서 재사용되는 작은 UI 조각을 담는 곳입니다.

`AppNavbar.vue`

상단 네비게이션 바입니다.

로그인 여부에 따라 보여주는 메뉴가 다릅니다.

비로그인 상태:

```txt
홈
종목 검색
로그인
회원가입
```

로그인 상태:

```txt
홈
종목 검색
포트폴리오
거래 내역
마이페이지
로그아웃
```

버튼을 클릭하면 `App.vue`로 이벤트를 보내고, `App.vue`가 화면을 바꿉니다.

`AppFooter.vue`

페이지 하단 푸터입니다. 서비스명, 약관, 개인정보처리방침, 고객센터 링크를 표시합니다.

`PageShell.vue`

일반 페이지 레이아웃을 잡아주는 공통 껍데기입니다. 페이지 제목과 설명을 보여주고, 내부에 각 화면의 내용을 넣습니다.

`MarketIndexCard.vue`

코스피, 코스닥, 원/달러 환율 같은 시장 지표 카드를 표시합니다.

`MetricCard.vue`

총 자산, 평가 손익, 수익률, 보유 현금 같은 요약 수치 카드를 표시합니다.

`HoldingTable.vue`

보유 종목 테이블입니다. 대시보드와 포트폴리오 화면에서 재사용합니다.

`StockListItem.vue`

홈 화면의 인기 종목 리스트 아이템입니다.

`StockResultCard.vue`

종목 검색 결과 카드입니다. 검색 화면에서 사용합니다.

### `src/data/mockData.js`

백엔드 API가 아직 없기 때문에 화면에 보여줄 임시 데이터를 모아둔 파일입니다.

들어 있는 데이터:

```txt
marketIndices     시장 지수: 코스피, 코스닥, 환율
stocks            종목 목록: 삼성전자, SK하이닉스, NAVER 등
accountSummary    총 자산, 평가 손익, 수익률, 보유 현금
transactions      거래 내역
newsItems         뉴스 목록
userProfile       사용자 정보
```

나중에 API를 붙이면 이 파일의 역할은 줄어들고, 예를 들어 아래처럼 바뀔 수 있습니다.

```txt
src/
  services/
    stockApi.js
    authApi.js
    portfolioApi.js
    transactionApi.js
```

### `src/assets/`

CSS와 이미지 같은 정적 리소스를 담는 곳입니다.

`base.css`

전체 프로젝트의 기본 설정을 담습니다. 색상 변수, 폰트, 기본 body 스타일, Material Symbols 아이콘 폰트 설정이 있습니다.

`main.css`

실제 화면 스타일 대부분이 들어 있습니다. 네비게이션, 홈, 검색, 상세, 주문, 포트폴리오, 거래내역, 마이페이지의 CSS가 여기에 있습니다.

## 3. 이 프로젝트의 특징과 이해해야 할 흐름

### 특징 1. 현재는 라우터 없이 화면 전환을 합니다

일반적인 Vue 프로젝트에서는 `vue-router`를 사용해서 `/login`, `/stocks`, `/portfolio` 같은 URL을 만듭니다.

하지만 현재 프로젝트는 초기 화면 구현 단계라서 `App.vue`의 `currentPage` 값으로 화면을 전환합니다.

예를 들어:

```vue
<GuestHomeView v-if="currentPage === 'guest-home'" />
<LoginView v-else-if="currentPage === 'login'" />
<DashboardView v-else-if="currentPage === 'dashboard'" />
```

즉, 현재 구조에서는 URL이 바뀌는 것이 아니라 `currentPage` 값이 바뀌면서 다른 컴포넌트를 보여줍니다.

나중에 실제 서비스처럼 만들려면 `vue-router`를 붙여서 아래처럼 바꾸면 됩니다.

```txt
/                 비로그인 홈 또는 로그인 후 홈
/login            로그인
/stocks           종목 검색
/stocks/:stockId  종목 상세
/orders           주문
/portfolio        포트폴리오
/transactions     거래 내역
/mypage           마이페이지
```

### 특징 2. 로그인은 실제 로그인이 아니라 목업 로그인입니다

현재 로그인 버튼은 실제 카카오/네이버/구글 OAuth 인증을 하지 않습니다.

현재 흐름:

```txt
소셜 로그인 버튼 클릭
→ App.vue의 login() 실행
→ isLoggedIn = true
→ dashboard 화면으로 이동
```

나중에 실제 로그인 연동을 하면 `login()` 함수 안에서 백엔드 API 또는 OAuth URL로 연결해야 합니다.

예상 흐름:

```txt
카카오로 시작하기 클릭
→ 백엔드의 카카오 OAuth 시작 URL로 이동
→ 카카오 인증
→ 백엔드가 토큰 발급
→ 프론트가 사용자 정보 저장
→ 대시보드 이동
```

### 특징 3. 데이터는 한 곳에 모아두었습니다

화면마다 데이터를 직접 하드코딩하면 나중에 API를 붙이기 어렵습니다.

그래서 현재는 `src/data/mockData.js`에 임시 데이터를 모아두었습니다.

예를 들어 종목 데이터는 `stocks` 배열에 있습니다.

```js
export const stocks = [
  {
    id: 'samsung',
    name: '삼성전자',
    code: '005930',
    price: '73,400',
  },
]
```

화면에서는 이 데이터를 import해서 사용합니다.

```js
import { stocks } from '../data/mockData'
```

나중에 API가 생기면 `stocks`를 직접 import하는 대신 `fetchStocks()` 같은 함수를 호출하도록 바꾸면 됩니다.

### 특징 4. 화면과 컴포넌트를 분리했습니다

`views`는 페이지 전체를 담당합니다.

`components`는 여러 페이지에서 재사용할 수 있는 UI 조각입니다.

예를 들어 `HoldingTable.vue`는 대시보드와 포트폴리오에서 모두 사용합니다. 이렇게 해두면 보유 종목 테이블 디자인을 바꿀 때 한 파일만 수정하면 됩니다.

### 특징 5. 화면 간 이동은 이벤트로 처리합니다

자식 컴포넌트가 직접 `currentPage`를 바꾸지 않습니다. 대신 이벤트를 부모인 `App.vue`로 올립니다.

예시:

```vue
<button @click="$emit('navigate', 'portfolio')">
  포트폴리오 보기
</button>
```

그리고 `App.vue`에서 이벤트를 받습니다.

```vue
<DashboardView @navigate="navigate" />
```

이 구조를 이해하면 Vue의 기본 흐름을 잡기 쉽습니다.

```txt
사용자 클릭
→ 자식 컴포넌트가 이벤트 emit
→ App.vue가 이벤트 수신
→ currentPage 변경
→ 화면 변경
```

### 특징 6. 비로그인과 로그인 후 화면을 구분합니다

현재 서비스 흐름은 크게 두 가지입니다.

비로그인 흐름:

```txt
비로그인 홈
→ 종목 검색
→ 종목 상세
→ 로그인 유도
→ 소셜 로그인
```

로그인 후 흐름:

```txt
대시보드
→ 종목 검색
→ 종목 상세
→ 주문
→ 거래 내역
→ 포트폴리오
→ 마이페이지
```

`StockDetailView.vue`와 `SearchView.vue`는 비로그인/로그인 상태에서 공용으로 사용합니다. 대신 `isLoggedIn` 값을 받아서 버튼이나 문구를 다르게 보여줍니다.

## 4. 처음 코드를 볼 때 추천 순서

Vue가 익숙하지 않다면 아래 순서로 보는 것이 좋습니다.

1. `src/main.js`
2. `src/App.vue`
3. `src/data/mockData.js`
4. `src/views/GuestHomeView.vue`
5. `src/views/LoginView.vue`
6. `src/views/DashboardView.vue`
7. `src/components/AppNavbar.vue`
8. `src/assets/main.css`

가장 중요한 것은 `App.vue`입니다. 현재 프로젝트에서는 `App.vue`가 화면 전환, 로그인 상태, 선택된 종목, 주문 타입을 모두 관리합니다.

## 5. 개발 실행 방법

의존성 설치:

```sh
npm install
```

개발 서버 실행:

```sh
npm run dev
```

빌드 확인:

```sh
npm run build
```

현재 PC 환경에서 `npm` 경로 문제가 발생할 수 있습니다. 그 경우 로컬 Vite 실행 파일을 직접 실행할 수 있습니다.

```sh
.\node_modules\.bin\vite.cmd
```

빌드는 아래처럼 확인할 수 있습니다.

```sh
.\node_modules\.bin\vite.cmd build
```

## 6. 앞으로 개선할 부분

1. `vue-router` 추가

현재는 `currentPage`로 화면을 바꾸지만, 실제 서비스에서는 URL 기반 라우팅이 필요합니다.

2. 실제 소셜 로그인 연동

카카오, 네이버, Google OAuth를 백엔드와 연결해야 합니다.

3. API 서비스 계층 추가

`mockData.js` 대신 API 호출 파일을 만들면 유지보수가 쉬워집니다.

예상 구조:

```txt
src/
  services/
    authApi.js
    stockApi.js
    orderApi.js
    portfolioApi.js
    transactionApi.js
```

4. 상태 관리 도입

로그인 사용자 정보, 보유 자산, 선택 종목 등이 커지면 Pinia 같은 상태 관리 라이브러리를 사용할 수 있습니다.

5. 사용하지 않는 기본 템플릿 파일 정리

Vue 기본 템플릿 파일인 `HelloWorld.vue`, `TheWelcome.vue`, `WelcomeItem.vue`, `components/icons/`는 현재 사용하지 않으므로 나중에 삭제해도 됩니다.
