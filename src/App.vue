<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/store/useUser.js'

const userStore = useUserStore()

onMounted(() => {
  // 初始化用户状态，从本地存储恢复登录状态
  userStore.initUserState()
})
</script>

<template>
  <div>
    <RouterView />
    <Login></Login>
  </div>
</template>

<style>
</style>
