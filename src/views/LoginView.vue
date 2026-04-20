<script setup>
defineEmits(['login', 'navigate'])
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <div class="auth-header">
        <span class="auth-logo">SP</span>
        <h1>소셜 계정으로 빠르게 시작해보세요</h1>
        <p>간편하게 로그인하고 모의투자로 주식 시장을 경험해보세요.</p>
      </div>

      <div class="social-stack">
        <button class="social-button kakao" type="button" @click="$emit('login')">카카오로 시작하기</button>
        <button class="social-button naver" type="button" @click="$emit('login')">네이버로 시작하기</button>
        <button class="social-button google" type="button" @click="$emit('login')">Google로 시작하기</button>
      </div>

      <p class="auth-legal">
        소셜 로그인을 진행하면 서비스 이용약관 및 개인정보처리방침에 동의한 것으로 간주됩니다.
      </p>
    </section>
  </main>
</template>
