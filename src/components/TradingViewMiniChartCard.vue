<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  dateRange: {
    type: String,
    default: '12M',
  },
  height: {
    type: Number,
    default: 220,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const widgetHost = ref(null)

function renderWidget() {
  if (!widgetHost.value) return

  widgetHost.value.innerHTML = ''

  const container = document.createElement('div')
  container.className = 'tradingview-widget-container'
  container.style.height = '100%'
  container.style.width = '100%'

  const widget = document.createElement('div')
  widget.className = 'tradingview-widget-container__widget'
  widget.style.height = '100%'
  widget.style.width = '100%'
  container.appendChild(widget)

  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js'
  script.type = 'text/javascript'
  script.async = true
  script.innerHTML = JSON.stringify({
    symbol: props.symbol,
    width: '100%',
    height: props.height,
    locale: 'kr',
    dateRange: props.dateRange,
    colorTheme: 'light',
    isTransparent: true,
    autosize: false,
    largeChartUrl: '',
    chartOnly: false,
    noTimeScale: false,
    trendLineColor: 'rgba(0, 61, 155, 1)',
    underLineColor: 'rgba(0, 61, 155, 0.16)',
    underLineBottomColor: 'rgba(0, 61, 155, 0)',
  })

  container.appendChild(script)
  widgetHost.value.appendChild(container)
}

onMounted(async () => {
  await nextTick()
  renderWidget()
})

watch(
  () => [props.symbol, props.dateRange, props.height],
  async () => {
    await nextTick()
    renderWidget()
  },
)

onBeforeUnmount(() => {
  if (widgetHost.value) {
    widgetHost.value.innerHTML = ''
  }
})
</script>

<template>
  <article class="tradingview-card" :class="{ compact }">
    <div class="tradingview-card-header">
      <div>
        <p class="eyebrow">{{ title }}</p>
        <h3>{{ symbol }}</h3>
      </div>
      <span class="live-badge">TradingView</span>
    </div>
    <p v-if="description" class="tradingview-description">{{ description }}</p>
    <div ref="widgetHost" class="tradingview-widget-host" :style="{ height: `${height}px` }">
      <div class="chart-loading">차트를 불러오는 중입니다</div>
    </div>
  </article>
</template>
