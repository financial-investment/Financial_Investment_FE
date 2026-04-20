<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  trend: {
    type: String,
    default: 'flat',
    validator: (value) => ['up', 'down', 'flat'].includes(value),
  },
})
</script>

<template>
  <article class="market-card" :class="`is-${trend}`">
    <div class="market-card-header">
      <div>
        <p class="eyebrow">{{ title }}</p>
        <h3>{{ value }}</h3>
      </div>
      <span class="trend-badge">
        <span class="trend-icon" aria-hidden="true">
          {{ trend === 'up' ? 'trending_up' : trend === 'down' ? 'trending_down' : 'horizontal_rule' }}
        </span>
        {{ status }}
      </span>
    </div>

    <svg class="sparkline" viewBox="0 0 260 72" role="img" :aria-label="`${title} 미니 차트`">
      <path class="sparkline-bg" d="M4 56 C48 52 57 22 96 31 S151 54 184 28 221 20 256 16" />
      <path
        v-if="trend === 'up'"
        class="sparkline-line"
        d="M4 56 C48 52 57 22 96 31 S151 54 184 28 221 20 256 16"
      />
      <path
        v-else-if="trend === 'down'"
        class="sparkline-line"
        d="M4 18 C45 22 58 46 94 39 S151 19 186 44 225 52 256 58"
      />
      <path v-else class="sparkline-line" d="M4 38 C40 35 69 42 99 38 S158 34 191 39 226 36 256 38" />
    </svg>
  </article>
</template>
