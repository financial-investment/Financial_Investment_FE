<script setup>
import HoldingTable from '../components/HoldingTable.vue'
import MarketIndexCard from '../components/MarketIndexCard.vue'
import MetricCard from '../components/MetricCard.vue'
import PageShell from '../components/PageShell.vue'
import { accountSummary, marketIndices, stocks, transactions } from '../data/mockData'

defineEmits(['navigate', 'select-stock'])
</script>

<template>
  <PageShell title="메인페이지 조회" description="시장 현황과 나의 모의투자 현황을 한눈에 확인하세요." wide>
    <section class="market-section compact">
      <MarketIndexCard v-for="index in marketIndices" :key="index.title" v-bind="index" />
    </section>

    <section class="metric-grid">
      <MetricCard v-for="metric in accountSummary" :key="metric.label" v-bind="metric" />
    </section>

    <div class="dashboard-grid">
      <section>
        <div class="section-heading">
          <h2>나의 포트폴리오</h2>
          <button class="link-button" type="button" @click="$emit('navigate', 'portfolio')">상세보기</button>
        </div>
        <HoldingTable :stocks="stocks.slice(0, 4)" @select="$emit('select-stock', $event)" />
      </section>

      <aside class="side-column">
        <section class="side-card">
          <div class="section-heading tight">
            <h3>최근 거래 내역</h3>
            <button class="icon-link" type="button" @click="$emit('navigate', 'transactions')">history</button>
          </div>
          <button
            v-for="trade in transactions.slice(0, 3)"
            :key="trade.id"
            class="transaction-mini"
            type="button"
            @click="$emit('navigate', 'transactions')"
          >
            <span class="trade-icon" :class="trade.type === '매수' ? 'tone-up' : 'tone-down'">
              {{ trade.type === '매수' ? 'shopping_cart' : 'sell' }}
            </span>
            <span>
              <strong>{{ trade.stockName }} {{ trade.type }}</strong>
              <small>{{ trade.date }} · {{ trade.price }}원</small>
            </span>
            <em :class="trade.type === '매수' ? 'tone-text-up' : 'tone-text-down'">
              {{ trade.type === '매수' ? '+' : '-' }}{{ trade.quantity }}주
            </em>
          </button>
        </section>

        <section class="action-banner">
          <h3>투자 실력을 높이고 싶다면</h3>
          <p>포트폴리오 분석으로 보유 종목과 수익률을 점검해보세요.</p>
          <button type="button" @click="$emit('navigate', 'portfolio')">자산 리포트 보기</button>
        </section>
      </aside>
    </div>
  </PageShell>
</template>
