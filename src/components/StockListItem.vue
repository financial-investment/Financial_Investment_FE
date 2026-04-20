<script setup>
defineProps({
  initial: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  change: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    default: 'neutral',
    validator: (value) => ['up', 'down', 'neutral'].includes(value),
  },
  color: {
    type: String,
    default: 'blue',
  },
})
</script>

<template>
  <button class="stock-item" type="button">
    <span class="stock-left">
      <span class="stock-avatar" :class="`avatar-${color}`">{{ initial }}</span>
      <span>
        <strong>{{ name }}</strong>
        <small>{{ code }}</small>
      </span>
    </span>

    <span class="stock-price">
      <strong>{{ price }}</strong>
      <small :class="`tone-${tone}`">{{ change }}</small>
    </span>
  </button>
</template>
