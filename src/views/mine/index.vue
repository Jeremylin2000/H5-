<script setup>
import tabbar from '@/components/tabbar.vue'
import emitter from '@/utils/mitt.js'
import { useUserStore } from '@/store/useUser.js'

const userStore = useUserStore()

const goToLogin = () => {
  // 如果已经登录，显示用户信息
  if (userStore.loggedIn) {
    console.log('当前用户:', userStore.getUserInfo())
    // 这里可以显示用户信息或者跳转到用户中心
    return
  }
  
  // 如果未登录，触发登录事件
  emitter.emit('toLogin', { show: true })
}

// 登出方法
const handleLogout = () => {
  userStore.logout()
  console.log('用户已登出')
}
</script>

<template>
  <div class="about-page">
    <van-nav-bar title="关于我们" />

    <van-cell-group inset>
      <van-cell title="项目名称" value="旅行分享社区" />
      <van-cell title="版本号" value="v1.0.0" />
      <van-cell title="开发者" value="你的名字" />
    </van-cell-group>

    <van-divider>项目介绍</van-divider>
    <div class="about-content">
      <van-image
        width="100"
        height="100"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png"
        round
      />
      <p>
        本项目是一个基于 Vue3 + Vant UI 的旅行分享社区，用户可以发布旅行见闻、交流经验、结识朋友。
      </p>
    </div>

    <div class="login-section">
      <!-- 已登录状态 -->
      <div v-if="userStore.loggedIn" class="user-info">
        <van-cell-group inset>
          <van-cell title="用户名" :value="userStore.username" />
          <van-cell title="用户ID" :value="userStore.userId" />
        </van-cell-group>
        <van-button 
          type="danger" 
          size="large" 
          block 
          @click="handleLogout"
          class="logout-btn"
        >
          退出登录
        </van-button>
      </div>
      
      <!-- 未登录状态 -->
      <van-button 
        v-else
        type="primary" 
        size="large" 
        block 
        @click="goToLogin"
        class="login-btn"
      >
        立即登录
      </van-button>
    </div>
  </div>
  <tabbar />
</template>

<style scoped>
.about-page {
  padding: 16px;
}
.about-content {
  text-align: center;
  margin-top: 16px;
}
.about-content p {
  margin-top: 12px;
  color: #666;
  font-size: 15px;
}
.login-section {
  margin-top: 32px;
  padding: 0 16px;
}
.login-btn, .logout-btn {
  border-radius: 8px;
  margin-top: 16px;
}
.user-info {
  margin-top: 16px;
}
</style>