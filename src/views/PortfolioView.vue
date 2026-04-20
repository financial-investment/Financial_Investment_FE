<script setup>
import HoldingTable from '../components/HoldingTable.vue'
import MetricCard from '../components/MetricCard.vue'
import PageShell from '../components/PageShell.vue'
import { accountSummary, stocks } from '../data/mockData'

defineEmits(['select-stock'])

const allocation = [
  { label: '반도체', value: '48%', color: '#003d9b' },
  { label: '플랫폼', value: '22%', color: '#006a6a' },
  { label: '자동차', value: '18%', color: '#7b2600' },
  { label: '현금', value: '12%', color: '#737685' },
]
</script>

<template>
  <PageShell title="포트폴리오 조회" description="보유 주식, 예수금, 수익률을 기준으로 나의 투자 상태를 확인하세요." wide>
    <section class="metric-grid">
      <MetricCard v-for="metric in accountSummary" :key="metric.label" v-bind="metric" />
    </section>

    <div class="portfolio-grid">
      <section class="chart-card">
        <div class="section-heading">
          <h2>자산 배분</h2>
          <span class="muted-text">총 자산 기준</span>
        </div>
        <div class="donut-wrap">
          <div class="donut-chart" aria-label="자산 배분 차트"></div>
          <div class="allocation-list">
            <div v-for="item in allocation" :key="item.label">
              <span :style="{ backgroundColor: item.color }"></span>
              <strong>{{ item.label }}</strong>
              <em>{{ item.value }}</em>
            </div>
          </div>
        </div>
      </section>

      <section class="chart-card">
        <div class="section-heading">
          <h2>수익률 추이</h2>
          <span class="muted-text">최근 30일</span>
        </div>
        <svg class="big-chart compact-chart" viewBox="0 0 620 220" role="img" aria-label="포트폴리오 수익률 차트">
          <defs>
            <linearGradient id="portfolioChartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#006a6a" stop-opacity="0.24" />
              <stop offset="100%" stop-color="#006a6a" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,150 C80,132 112,160 180,118 S305,85 380,102 498,58 620,36" class="chart-line" />
          <path d="M0,150 C80,132 112,160 180,118 S305,85 380,102 498,58 620,36 L620,220 L0,220 Z" fill="url(#portfolioChartFill)" />
        </svg>
      </section>
    </div>

    <section>
      <div class="section-heading">
        <h2>보유 주식</h2>
        <button class="link-button" type="button">수익률 높은 순</button>
      </div>
      <HoldingTable :stocks="stocks" @select="$emit('select-stock', $event)" />
    </section>
  </PageShell>
</template>
