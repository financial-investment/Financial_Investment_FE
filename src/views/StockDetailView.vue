<script setup>
const props = defineProps({
  stock: {
    type: Object,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['navigate', 'order', 'login'])

const quoteRows = [
  { ask: '73,800', askQty: '3,120', bid: '73,700', bidQty: '2,850' },
  { ask: '73,700', askQty: '4,080', bid: '73,600', bidQty: '4,210' },
  { ask: '73,600', askQty: '5,920', bid: '73,500', bidQty: '3,780' },
  { ask: '73,500', askQty: '2,440', bid: '73,400', bidQty: '6,310' },
]

const chartPath =
  props.stock.trend === 'up'
    ? 'M0,180 C70,130 100,150 150,100 S260,70 320,95 420,42 520,62 620,25'
    : 'M0,70 C80,80 120,120 170,105 S260,52 330,118 430,150 520,135 620,170'
</script>

<template>
  <main class="detail-page">
    <section class="detail-hero">
      <div>
        <button class="back-button" type="button" @click="$emit('navigate', isLoggedIn ? 'search' : 'guest-search')">
          arrow_back
          목록으로
        </button>
        <div class="stock-title-row">
          <span class="stock-symbol">{{ stock.name.charAt(0) }}</span>
          <div>
            <h1>{{ stock.name }}</h1>
            <p>{{ stock.code }} · {{ stock.market }} · {{ stock.sector }}</p>
          </div>
        </div>
      </div>

      <div class="detail-price">
        <strong>{{ stock.price }}원</strong>
        <span :class="stock.trend === 'up' ? 'tone-text-up' : 'tone-text-down'">
          {{ stock.change }}원 {{ stock.changeRate }}
        </span>
      </div>
    </section>

    <div class="detail-grid">
      <section class="chart-card">
        <div class="section-heading">
          <h2>차트 확인</h2>
          <div class="segmented">
            <button class="active" type="button">1일</button>
            <button type="button">1주</button>
            <button type="button">1개월</button>
            <button type="button">1년</button>
          </div>
        </div>
        <svg class="big-chart" viewBox="0 0 620 220" role="img" :aria-label="`${stock.name} 가격 차트`">
          <defs>
            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#006a6a" stop-opacity="0.24" />
              <stop offset="100%" stop-color="#006a6a" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path :d="`${chartPath} L620,220 L0,220 Z`" fill="url(#chartFill)" />
          <path :d="chartPath" class="chart-line" />
        </svg>
      </section>

      <aside class="quote-card">
        <h2>호가</h2>
        <div class="quote-head">
          <span>매도</span>
          <span>수량</span>
          <span>매수</span>
          <span>수량</span>
        </div>
        <div v-for="row in quoteRows" :key="row.ask" class="quote-row">
          <strong class="tone-text-down">{{ row.ask }}</strong>
          <span>{{ row.askQty }}</span>
          <strong class="tone-text-up">{{ row.bid }}</strong>
          <span>{{ row.bidQty }}</span>
        </div>

        <div class="order-actions">
          <button v-if="isLoggedIn" class="buy-button" type="button" @click="$emit('order', 'buy')">매수하기</button>
          <button v-if="isLoggedIn" class="sell-button" type="button" @click="$emit('order', 'sell')">매도하기</button>
          <button v-else class="primary-button full" type="button" @click="$emit('login')">로그인하고 모의투자하기</button>
        </div>
      </aside>
    </div>
  </main>
</template>
