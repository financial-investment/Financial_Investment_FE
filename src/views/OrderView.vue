<script setup>
defineProps({
  stock: {
    type: Object,
    required: true,
  },
  orderType: {
    type: String,
    default: 'buy',
  },
})

defineEmits(['navigate'])
</script>

<template>
  <main class="order-page">
    <section class="order-card">
      <button class="back-button" type="button" @click="$emit('navigate', 'detail')">arrow_back 상세로 돌아가기</button>
      <div class="section-heading">
        <div>
          <h1>{{ stock.name }} {{ orderType === 'buy' ? '매수' : '매도' }}</h1>
          <p>{{ stock.code }} · 현재가 {{ stock.price }}원</p>
        </div>
        <span :class="orderType === 'buy' ? 'order-type buy' : 'order-type sell'">
          {{ orderType === 'buy' ? 'BUY' : 'SELL' }}
        </span>
      </div>

      <form class="order-form" @submit.prevent="$emit('navigate', 'transactions')">
        <label>
          주문 가격
          <input type="text" :value="stock.price" />
        </label>
        <label>
          주문 수량
          <input type="number" value="10" min="1" />
        </label>
        <label>
          예상 주문 금액
          <input type="text" value="734,000원" readonly />
        </label>
        <button :class="orderType === 'buy' ? 'buy-button full' : 'sell-button full'" type="submit">
          {{ orderType === 'buy' ? '매수 주문 넣기' : '매도 주문 넣기' }}
        </button>
      </form>

      <p class="order-note">지정가 주문은 입력한 가격에 도달하면 체결됩니다. 시장가 주문은 추후 연동 예정입니다.</p>
    </section>
  </main>
</template>
