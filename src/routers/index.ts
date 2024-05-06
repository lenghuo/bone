import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Index',
            component: () => import('@/views/index/index.vue')
        }
    ]
})

export default router
