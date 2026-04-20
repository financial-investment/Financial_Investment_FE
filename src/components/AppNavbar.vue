<script setup>
import { computed } from 'vue'

const props = defineProps({
  activePage: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['navigate', 'login', 'logout'])

const guestLinks = [
  { id: 'guest-home', label: '홈' },
  { id: 'guest-search', label: '종목 검색' },
]

const memberLinks = [
  { id: 'dashboard', label: '홈' },
  { id: 'search', label: '종목 검색' },
  { id: 'portfolio', label: '포트폴리오' },
  { id: 'transactions', label: '거래 내역' },
  { id: 'mypage', label: '마이페이지' },
]

const links = computed(() => (props.isLoggedIn ? memberLinks : guestLinks))
</script>

<template>
  <nav class="app-navbar" aria-label="주요 메뉴">
    <div class="nav-inner">
      <div class="nav-left">
        <button class="brand" type="button" @click="emit('navigate', isLoggedIn ? 'dashboard' : 'guest-home')">
          <span class="brand-mark">SP</span>
          <span>스톡플레이</span>
        </button>

        <div class="nav-links">
          <button
            v-for="link in links"
            :key="link.id"
            class="nav-link"
            :class="{ active: activePage === link.id }"
            type="button"
            @click="emit('navigate', link.id)"
          >
            {{ link.label }}
          </button>
        </div>
      </div>

      <div v-if="isLoggedIn" class="nav-actions">
        <button class="icon-button" type="button" aria-label="알림">notifications</button>
        <button class="icon-button" type="button" aria-label="설정">settings</button>
        <button class="profile-chip" type="button" @click="emit('navigate', 'mypage')">
          <span>
            <strong>김투자 님</strong>
            <small>Premium Member</small>
          </span>
          <span class="profile-avatar">김</span>
        </button>
        <button class="text-button" type="button" @click="emit('logout')">로그아웃</button>
      </div>

      <div v-else class="nav-actions">
        <button class="text-button" type="button" @click="emit('navigate', 'login')">로그인</button>
        <button class="primary-button compact" type="button" @click="emit('navigate', 'login')">회원가입</button>
      </div>
    </div>
  </nav>
</template>
