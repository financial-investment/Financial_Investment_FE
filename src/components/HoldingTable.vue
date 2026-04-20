<script setup>
defineProps({
  stocks: {
    type: Array,
    required: true,
  },
})

defineEmits(['select'])
</script>

<template>
  <div class="table-card">
    <table>
      <thead>
        <tr>
          <th>종목명</th>
          <th>평균 매수가</th>
          <th>현재가</th>
          <th>수익률</th>
          <th>보유 수량</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in stocks" :key="stock.code" @click="$emit('select', stock.id)">
          <td>
            <span class="table-stock">
              <span>{{ stock.name.charAt(0) }}</span>
              <span>
                <strong>{{ stock.name }}</strong>
                <small>{{ stock.code }}</small>
              </span>
            </span>
          </td>
          <td>{{ stock.avgBuyPrice }}원</td>
          <td>{{ stock.price }}원</td>
          <td :class="stock.trend === 'up' ? 'tone-text-up' : 'tone-text-down'">{{ stock.roi }}</td>
          <td>{{ stock.quantity }}주</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
