import { createApp } from 'vue'
// import './style.css'
import router from './router/index'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Toast } from 'vant';
import { createPinia } from 'pinia'
import App from './App.vue'
import login from '@/views/login/index.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(Vant) // 使用Vant组件库
app.use(Toast);
app.use(pinia) // 使用Pinia状态管理
app.component('Login', login) // 注册登录组件
app.use(router)
app.mount('#app')
