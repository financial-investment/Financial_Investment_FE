<script setup>
import { AreaSeries, createChart } from 'lightweight-charts'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  change: {
    type: Number,
    required: true,
  },
  changeRate: {
    type: Number,
    required: true,
  },
  direction: {
    type: String,
    default: 'FLAT',
  },
  baseDateTime: {
    type: String,
    default: '',
  },
  chartColor: {
    type: String,
    default: '#003d9b',
  },
  chartData: {
    type: Array,
    default: () => [],
  },
  showChart: {
    type: Boolean,
    default: true,
  },
})

const chartContainer = ref(null)
let chart
let areaSeries
let resizeObserver

const valueToneClass = computed(() => {
  if (props.direction === 'UP') return 'tone-text-up'
  if (props.direction === 'DOWN') return 'tone-text-down'
  return ''
})

const statusLabel = computed(() => {
  if (props.direction === 'UP') return '상승'
  if (props.direction === 'DOWN') return '하락'
  return '보합'
})

const formattedCurrentPrice = computed(() =>
  new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(props.currentPrice),
)

const formattedChange = computed(() => {
  const sign = props.change > 0 ? '+' : ''
  return `${sign}${new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(props.change)}`
})

const formattedChangeRate = computed(() => {
  const sign = props.changeRate > 0 ? '+' : ''
  return `${sign}${props.changeRate.toFixed(2)}%`
})

const formattedBaseTime = computed(() => {
  if (!props.baseDateTime) return ''

  const date = new Date(props.baseDateTime)

  if (Number.isNaN(date.getTime())) {
    return props.baseDateTime
  }

  return new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
})

function toTransparent(hex, alpha) {
  const normalized = hex.replace('#', '')
  if (normalized.length !== 6) return `rgba(0, 61, 155, ${alpha})`

  const r = Number.parseInt(normalized.slice(0, 2), 16)
  const g = Number.parseInt(normalized.slice(2, 4), 16)
  const b = Number.parseInt(normalized.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function createOrUpdateChart() {
  if (!props.showChart || !chartContainer.value || !props.chartData.length) return

  const width = chartContainer.value.clientWidth
  const height = chartContainer.value.clientHeight

  if (!chart) {
    chart = createChart(chartContainer.value, {
      width,
      height,
      layout: {
        background: { color: 'transparent' },
        textColor: '#737685',
        attributionLogo: false,
      },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
        tickMarkFormatter: (time) => {
          if (typeof time !== 'string') return ''
          return time.slice(5).replace('-', '.')
        },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: 'rgba(195, 198, 214, 0.28)' },
      },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      handleScroll: false,
      handleScale: false,
    })

    areaSeries = chart.addSeries(AreaSeries, {
      lineColor: props.chartColor,
      topColor: toTransparent(props.chartColor, 0.24),
      bottomColor: toTransparent(props.chartColor, 0.02),
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 3,
    })
  } else {
    chart.applyOptions({ width, height })
    areaSeries.applyOptions({
      lineColor: props.chartColor,
      topColor: toTransparent(props.chartColor, 0.24),
      bottomColor: toTransparent(props.chartColor, 0.02),
    })
  }

  areaSeries.setData(props.chartData)
  chart.timeScale().fitContent()
}

onMounted(() => {
  createOrUpdateChart()

  if (chartContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      createOrUpdateChart()
    })
    resizeObserver.observe(chartContainer.value)
  }
})

watch(
  () => [props.chartData, props.chartColor],
  () => {
    createOrUpdateChart()
  },
  { deep: true },
)

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }

  if (chart) {
    chart.remove()
    chart = null
    areaSeries = null
  }
})
</script>

<template>
  <article class="market-live-card">
    <div class="market-live-header">
      <div>
        <p class="eyebrow">{{ title }}</p>
        <h3>{{ formattedCurrentPrice }}</h3>
      </div>
      <span class="market-live-badge" :class="valueToneClass">{{ statusLabel }}</span>
    </div>

    <p class="market-live-change" :class="valueToneClass">
      {{ formattedChange }} ({{ formattedChangeRate }})
    </p>

    <div v-if="showChart" ref="chartContainer" class="market-live-chart">
      <div v-if="!chartData.length" class="chart-loading">차트 데이터가 없습니다</div>
    </div>

    <div v-else class="market-live-spot">
      <div class="market-live-spot-badge">실시간 환율</div>
      <p>차트 없이 현재 환율 기준으로만 표시합니다.</p>
    </div>

    <p class="market-live-time">기준 시각 {{ formattedBaseTime }}</p>
  </article>
</template>
