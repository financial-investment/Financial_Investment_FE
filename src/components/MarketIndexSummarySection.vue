<script setup>
import { onMounted, ref } from 'vue'
import { getExchangeRateSummary, getMarketIndexSummary } from '../services/marketApi'
import MarketIndexChartCard from './MarketIndexChartCard.vue'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
})

const marketIndexes = ref([])
const exchangeRates = ref([])
const isMarketLoading = ref(true)
const marketError = ref('')

async function loadMarketIndexes() {
  isMarketLoading.value = true
  marketError.value = ''

  try {
    const [indexes, rates] = await Promise.all([getMarketIndexSummary(), getExchangeRateSummary()])
    marketIndexes.value = indexes
    exchangeRates.value = rates
  } catch (error) {
    marketError.value = error instanceof Error ? error.message : '시장 지수 정보를 불러오지 못했습니다.'
  } finally {
    isMarketLoading.value = false
  }
}

onMounted(() => {
  loadMarketIndexes()
})
</script>

<template>
  <section class="market-section live-market-section" :class="{ compact }" aria-label="시장 지수">
    <template v-if="isMarketLoading">
      <article v-for="index in 2" :key="index" class="market-live-card market-live-skeleton">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line medium"></div>
        <div class="skeleton-chart"></div>
        <div class="skeleton-line short"></div>
      </article>
    </template>

    <template v-else-if="marketError">
      <article class="market-live-card market-live-empty">
        <h3>시장 지수 정보를 불러오지 못했습니다</h3>
        <p>{{ marketError }}</p>
        <button class="primary-button compact" type="button" @click="loadMarketIndexes">다시 시도</button>
      </article>
    </template>

    <template v-else>
      <MarketIndexChartCard
        v-for="index in marketIndexes"
        :key="index.id"
        :title="index.label"
        :current-price="index.currentPrice"
        :change="index.change"
        :change-rate="index.changeRate"
        :direction="index.direction"
        :base-date-time="index.baseDateTime"
        :chart-color="index.chartColor"
        :chart-data="index.chartData"
      />

      <MarketIndexChartCard
        v-for="rate in exchangeRates"
        :key="rate.id"
        :title="rate.label"
        :current-price="rate.currentPrice"
        :change="rate.change"
        :change-rate="rate.changeRate"
        :direction="rate.direction"
        :base-date-time="rate.baseDateTime"
        :chart-color="rate.chartColor"
        :chart-data="rate.chartData"
        :show-chart="false"
      />
    </template>
  </section>
</template>
