<script setup>
defineProps({
  stock: {
    type: Object,
    required: true,
  },
})

defineEmits(['select'])
</script>

<template>
  <button class="result-card" type="button" @click="$emit('select', stock.id)">
    <span class="result-main">
      <span class="result-icon">analytics</span>
      <span>
        <span class="result-title">
          <strong>{{ stock.name }}</strong>
          <small>{{ stock.code }}</small>
          <em>{{ stock.market }}</em>
        </span>
        <span class="result-desc">{{ stock.description }}</span>
      </span>
    </span>

    <span class="result-price">
      <strong>{{ stock.price }}원</strong>
      <small :class="stock.trend === 'up' ? 'tone-text-up' : 'tone-text-down'">
        {{ stock.change }}원 {{ stock.changeRate }}
      </small>
    </span>
  </button>
</template>
