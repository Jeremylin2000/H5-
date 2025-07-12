import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref(null)
  
  // 登录状态
  const isLoggedIn = ref(false)
  
  // 登录token
  const token = ref('')
  
  // 计算属性：是否已登录
  const loggedIn = computed(() => isLoggedIn.value && !!token.value)
  
  // 计算属性：用户ID
  const userId = computed(() => userInfo.value?.id || null)
  
  // 计算属性：用户名
  const username = computed(() => userInfo.value?.username || '')
  
  // 计算属性：用户头像
  const avatar = computed(() => userInfo.value?.avatar || '')
  
  // 登录方法
  const login = (loginData) => {
    const { user, accessToken } = loginData
    
    // 存储用户信息
    userInfo.value = user
    token.value = accessToken
    isLoggedIn.value = true
    
    // 保存到本地存储
    localStorage.setItem('userInfo', JSON.stringify(user))
    localStorage.setItem('token', accessToken)
    localStorage.setItem('isLoggedIn', 'true')
    
    console.log('用户登录成功:', user)
  }
  
  // 登出方法
  const logout = () => {
    // 清空状态
    userInfo.value = null
    token.value = ''
    isLoggedIn.value = false
    
    // 清除本地存储
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    
    console.log('用户已登出')
  }
  
  // 更新用户信息
  const updateUserInfo = (newUserInfo) => {
    userInfo.value = { ...userInfo.value, ...newUserInfo }
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }
  
  // 初始化用户状态（从本地存储恢复）
  const initUserState = () => {
    try {
      const savedUserInfo = localStorage.getItem('userInfo')
      const savedToken = localStorage.getItem('token')
      const savedLoginState = localStorage.getItem('isLoggedIn')
      
      if (savedUserInfo && savedToken && savedLoginState === 'true') {
        userInfo.value = JSON.parse(savedUserInfo)
        token.value = savedToken
        isLoggedIn.value = true
        console.log('从本地存储恢复用户状态')
      }
    } catch (error) {
      console.error('恢复用户状态失败:', error)
      // 如果恢复失败，清除本地存储
      logout()
    }
  }
  
  // 检查登录状态
  const checkLoginStatus = () => {
    return loggedIn.value
  }
  
  // 获取用户信息
  const getUserInfo = () => {
    return userInfo.value
  }
  
  // 获取token
  const getToken = () => {
    return token.value
  }
  
  return {
    // 状态
    userInfo,
    isLoggedIn,
    token,
    
    // 计算属性
    loggedIn,
    userId,
    username,
    avatar,
    
    // 方法
    login,
    logout,
    updateUserInfo,
    initUserState,
    checkLoginStatus,
    getUserInfo,
    getToken
  }
}) 