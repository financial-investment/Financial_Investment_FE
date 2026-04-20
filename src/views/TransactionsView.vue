<script setup>
import PageShell from '../components/PageShell.vue'
import { stocks, transactions } from '../data/mockData'

defineEmits(['select-stock'])
</script>

<template>
  <PageShell title="거래 내역 조회" description="전체 거래를 시간순으로 확인하거나 종목별, 유형별로 필터링하세요." wide>
    <section class="filter-card">
      <div class="field-row">
        <label>
          종목
          <select>
            <option>전체 종목</option>
            <option v-for="stock in stocks" :key="stock.code">{{ stock.name }}</option>
          </select>
        </label>
        <label>
          거래 유형
          <select>
            <option>전체</option>
            <option>매수</option>
            <option>매도</option>
            <option>미체결</option>
          </select>
        </label>
        <label>
          조회 기간
          <select>
            <option>최근 1개월</option>
            <option>최근 3개월</option>
            <option>전체 기간</option>
          </select>
        </label>
        <button class="primary-button" type="button">조회</button>
      </div>
    </section>

    <section class="timeline-card">
      <article v-for="trade in transactions" :key="trade.id" class="timeline-row">
        <span class="trade-icon" :class="trade.type === '매수' ? 'tone-up' : 'tone-down'">
          {{ trade.type === '매수' ? 'shopping_cart' : 'sell' }}
        </span>
        <div>
          <div class="transaction-title">
            <strong>{{ trade.stockName }} {{ trade.type }}</strong>
            <span :class="trade.status === '체결' ? 'status-done' : 'status-wait'">{{ trade.status }}</span>
          </div>
          <p>{{ trade.date }} · {{ trade.quantity }}주 · {{ trade.price }}원</p>
        </div>
        <button type="button" @click="$emit('select-stock', stocks.find((stock) => stock.code === trade.code)?.id || 'samsung')">
          {{ trade.amount }}원
        </button>
      </article>
    </section>
  </PageShell>
</template>
