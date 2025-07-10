import { createRouter, createWebHistory } from 'vue-router'
const router =  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/index/index.vue'),
        },
        {
            path: '/found',
            component: () => import('@/views/found/index.vue'),
        },
        {
            path: '/mine',
            component: () => import('@/views/mine/index.vue'),
        },
        {
            path: '/place',
            component: () => import('@/views/place/index.vue'),
        },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
        },
        {
            path: '/search',
            component: () => import('@/views/search/index.vue'),
        },
        {
            path: '/detail',
            component: () => import('@/views/detail/index.vue'),
        }
    ],
    scrollBehavior() { //路由滚动行为
        return { top: 0 }
    }
})
export default router