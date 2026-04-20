<script setup>
import PageShell from '../components/PageShell.vue'
import StockResultCard from '../components/StockResultCard.vue'
import { stocks } from '../data/mockData'

defineProps({
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['select-stock', 'navigate'])

const keywords = ['반도체 대장주', '2차전지', '플랫폼', '배당주', '저평가 우량주']
const trending = stocks.slice(1, 5)
</script>

<template>
  <PageShell :title="isLoggedIn ? '종목 검색' : '종목 검색'" description="종목명 또는 종목 코드를 입력해 투자할 회사를 찾아보세요." wide>
    <section class="search-hero">
      <div>
        <h2>{{ isLoggedIn ? '내 포트폴리오에 담을 다음 종목을 찾아보세요' : '첫 모의투자를 위한 종목을 찾아보세요' }}</h2>
        <form class="stock-search inline-search" @submit.prevent="$emit('select-stock', 'samsung')">
          <span class="search-icon" aria-hidden="true">search</span>
          <input type="search" value="삼성전자" aria-label="검색어" />
          <button class="primary-button" type="submit">검색</button>
        </form>
      </div>
    </section>

    <div class="search-layout">
      <section class="results-column">
        <div class="section-heading">
          <h2>검색 결과 <span class="count-text">2</span></h2>
          <div class="segmented">
            <button class="active" type="button">정확도순</button>
            <button type="button">거래량순</button>
          </div>
        </div>

        <StockResultCard :stock="stocks[0]" @select="$emit('select-stock', $event)" />
        <StockResultCard :stock="{ ...stocks[0], id: 'samsung-preferred', name: '삼성전자우', code: '005935', price: '59,800', change: '-300', changeRate: '-0.50%', trend: 'down', description: '삼성전자 우선주' }" @select="$emit('select-stock', 'samsung')" />

        <div class="guide-grid">
          <article class="info-panel">
            <span class="panel-icon">lightbulb</span>
            <h3>원하는 결과를 못 찾았나요?</h3>
            <p>정확한 종목 코드 6자리를 입력하면 더 빠르게 찾을 수 있습니다.</p>
          </article>
          <article class="info-panel strong">
            <span class="panel-icon">school</span>
            <h3>모의투자 가이드</h3>
            <p>스톡플레이에서는 가상 자산으로 위험 부담 없이 주식 투자를 연습할 수 있습니다.</p>
          </article>
        </div>
      </section>

      <aside class="side-column">
        <section class="side-card">
          <h3>추천 검색어</h3>
          <div class="tag-wrap">
            <button v-for="keyword in keywords" :key="keyword" type="button">{{ keyword }}</button>
          </div>
        </section>

        <section class="side-card">
          <h3>인기 종목 <small>14:20 기준</small></h3>
          <button v-for="(stock, index) in trending" :key="stock.code" class="ranking-row" type="button" @click="$emit('select-stock', stock.id)">
            <span>{{ index + 1 }}</span>
            <strong>{{ stock.name }}</strong>
            <em :class="stock.trend === 'up' ? 'tone-text-up' : 'tone-text-down'">{{ stock.changeRate }}</em>
          </button>
        </section>
      </aside>
    </div>
  </PageShell>
</template>
