<script setup>
import PageShell from '../components/PageShell.vue'
import { userProfile } from '../data/mockData'

defineEmits(['navigate'])
</script>

<template>
  <PageShell title="마이페이지 조회" description="사용자 정보를 확인하고 알림, 투자 설정을 관리하세요." wide>
    <div class="mypage-grid">
      <section class="profile-card">
        <div class="profile-large">
          <span>{{ userProfile.name.charAt(0) }}</span>
          <div>
            <h2>{{ userProfile.name }}</h2>
            <p>{{ userProfile.grade }}</p>
          </div>
        </div>
        <dl class="profile-list">
          <div>
            <dt>이메일</dt>
            <dd>{{ userProfile.email }}</dd>
          </div>
          <div>
            <dt>가입 방식</dt>
            <dd>{{ userProfile.provider }} 소셜 로그인</dd>
          </div>
          <div>
            <dt>가입일</dt>
            <dd>{{ userProfile.joinedAt }}</dd>
          </div>
        </dl>
      </section>

      <section class="settings-card">
        <h2>사용자 정보 수정</h2>
        <form class="settings-form">
          <label>
            표시 이름
            <input type="text" :value="userProfile.name" />
          </label>
          <label>
            이메일
            <input type="email" :value="userProfile.email" />
          </label>
          <label>
            기본 투자 금액
            <input type="text" value="100,000,000원" />
          </label>
          <button class="primary-button" type="button">저장하기</button>
        </form>
      </section>
    </div>

    <section class="quick-menu">
      <button type="button" @click="$emit('navigate', 'portfolio')">
        <span>pie_chart</span>
        포트폴리오 확인
      </button>
      <button type="button" @click="$emit('navigate', 'transactions')">
        <span>history</span>
        거래 내역 확인
      </button>
      <button type="button">
        <span>notifications</span>
        알림 설정
      </button>
    </section>
  </PageShell>
</template>
