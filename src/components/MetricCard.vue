<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'analytics',
  },
  tone: {
    type: String,
    default: 'primary',
  },
})
</script>

<template>
  <article class="metric-card">
    <div class="metric-top">
      <span class="metric-icon" :class="`tone-${tone}`">{{ icon }}</span>
      <span class="metric-label">{{ label }}</span>
    </div>
    <strong :class="`metric-value tone-text-${tone}`">{{ value }}</strong>
  </article>
</template>
