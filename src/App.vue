<script setup>
import { computed, ref } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppNavbar from './components/AppNavbar.vue'
import DashboardView from './views/DashboardView.vue'
import GuestHomeView from './views/GuestHomeView.vue'
import LoginView from './views/LoginView.vue'
import MyPageView from './views/MyPageView.vue'
import OrderView from './views/OrderView.vue'
import PortfolioView from './views/PortfolioView.vue'
import SearchView from './views/SearchView.vue'
import StockDetailView from './views/StockDetailView.vue'
import TransactionsView from './views/TransactionsView.vue'
import { stocks } from './data/mockData'

const isLoggedIn = ref(false)
const currentPage = ref('guest-home')
const selectedStockId = ref('samsung')
const orderType = ref('buy')

const selectedStock = computed(() => stocks.find((stock) => stock.id === selectedStockId.value) || stocks[0])

function navigate(page) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function login() {
  isLoggedIn.value = true
  navigate('dashboard')
}

function logout() {
  isLoggedIn.value = false
  navigate('guest-home')
}

function selectStock(stockId) {
  selectedStockId.value = stockId
  navigate(isLoggedIn.value ? 'detail' : 'guest-detail')
}

function startOrder(type) {
  orderType.value = type
  navigate('order')
}
</script>

<template>
  <AppNavbar :active-page="currentPage" :is-logged-in="isLoggedIn" @navigate="navigate" @login="login" @logout="logout" />

  <GuestHomeView
    v-if="currentPage === 'guest-home'"
    @navigate="navigate"
    @select-stock="selectStock"
  />

  <LoginView
    v-else-if="currentPage === 'login'"
    @login="login"
    @navigate="navigate"
  />

  <SearchView
    v-else-if="currentPage === 'guest-search'"
    :is-logged-in="false"
    @navigate="navigate"
    @select-stock="selectStock"
  />

  <StockDetailView
    v-else-if="currentPage === 'guest-detail'"
    :stock="selectedStock"
    :is-logged-in="false"
    @navigate="navigate"
    @login="navigate('login')"
  />

  <DashboardView
    v-else-if="currentPage === 'dashboard'"
    @navigate="navigate"
    @select-stock="selectStock"
  />

  <SearchView
    v-else-if="currentPage === 'search'"
    :is-logged-in="true"
    @navigate="navigate"
    @select-stock="selectStock"
  />

  <StockDetailView
    v-else-if="currentPage === 'detail'"
    :stock="selectedStock"
    :is-logged-in="true"
    @navigate="navigate"
    @order="startOrder"
  />

  <OrderView
    v-else-if="currentPage === 'order'"
    :stock="selectedStock"
    :order-type="orderType"
    @navigate="navigate"
  />

  <PortfolioView
    v-else-if="currentPage === 'portfolio'"
    @select-stock="selectStock"
  />

  <TransactionsView
    v-else-if="currentPage === 'transactions'"
    @select-stock="selectStock"
  />

  <MyPageView
    v-else-if="currentPage === 'mypage'"
    @navigate="navigate"
  />

  <AppFooter />
</template>
