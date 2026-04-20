<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  wide: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <main class="page-shell" :class="{ 'page-shell-wide': wide }">
    <header v-if="title || description" class="page-header">
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </header>
    <slot />
  </main>
</template>
