<script setup>
import MarketIndexCard from '../components/MarketIndexCard.vue'
import StockListItem from '../components/StockListItem.vue'
import { marketIndices, newsItems, stocks } from '../data/mockData'

const emit = defineEmits(['navigate', 'select-stock'])

const recommendedKeywords = ['삼성전자', '에코프로', 'SK하이닉스', '현대차']
const popularStocks = stocks.slice(0, 4).map((stock) => ({
  initial: stock.name.charAt(0),
  name: stock.name,
  code: stock.code,
  price: stock.price,
  change: stock.changeRate,
  tone: stock.trend,
  color: stock.trend === 'up' ? 'blue' : 'red',
  id: stock.id,
}))
</script>

<template>
  <main class="home-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1>가상 투자로 <span>주식 시장</span>을 경험해보세요</h1>
        <p>
          실제 데이터와 동일한 환경에서 리스크 없이 투자 실력을 키워보세요.
          <br />
          지금 바로 첫 종목을 검색하고 투자를 시작하세요.
        </p>

        <form class="stock-search" aria-label="종목 검색" @submit.prevent="emit('navigate', 'guest-search')">
          <span class="search-icon" aria-hidden="true">search</span>
          <input type="search" placeholder="종목명 또는 종목 코드를 입력하세요" />
          <button class="primary-button" type="submit">검색하기</button>
        </form>

        <div class="keyword-row" aria-label="추천 검색어">
          <span>추천 검색어</span>
          <button v-for="keyword in recommendedKeywords" :key="keyword" type="button" @click="emit('navigate', 'guest-search')">
            {{ keyword }}
          </button>
        </div>
      </div>
    </section>

    <section class="market-section" aria-label="시장 지수">
      <MarketIndexCard v-for="index in marketIndices" :key="index.title" v-bind="index" />
    </section>

    <section class="content-band">
      <div class="content-grid">
        <section class="popular-section" aria-labelledby="popular-title">
          <div class="section-heading">
            <h2 id="popular-title">인기 종목</h2>
            <button class="link-button" type="button" @click="emit('navigate', 'guest-search')">
              전체보기
              <span aria-hidden="true">arrow_forward</span>
            </button>
          </div>

          <div class="stock-grid">
            <StockListItem
              v-for="stock in popularStocks"
              :key="stock.code"
              :initial="stock.initial"
              :name="stock.name"
              :code="stock.code"
              :price="stock.price"
              :change="stock.change"
              :tone="stock.tone"
              :color="stock.color"
              @click="emit('select-stock', stock.id)"
            />
          </div>
        </section>

        <section class="news-section" aria-labelledby="news-title">
          <h2 id="news-title">오늘의 뉴스</h2>
          <div class="news-list">
            <article v-for="news in newsItems" :key="news.title" class="news-card">
              <p>{{ news.category }}</p>
              <h3>{{ news.title }}</h3>
              <small>{{ news.source }} · {{ news.time }}</small>
            </article>
          </div>
        </section>
      </div>
    </section>

    <section class="cta-section" aria-labelledby="cta-title">
      <div class="cta-panel">
        <div>
          <h2 id="cta-title">준비되셨나요?</h2>
          <p>가상의 1억 원으로 당신만의 포트폴리오를 구성하고 수익을 창출하는 즐거움을 경험하세요.</p>
        </div>

        <div class="cta-actions">
          <button class="light-button" type="button" @click="emit('navigate', 'login')">무료로 시작하기</button>
          <button class="outline-button" type="button" @click="emit('navigate', 'guest-search')">서비스 둘러보기</button>
        </div>
      </div>
    </section>
  </main>
</template>
