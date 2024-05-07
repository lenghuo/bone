import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
          path: '/',
          name: 'Index',
          redirect: '/index',
          // component: () => import('@/views/index/index.vue')
        },
        {
          path: '/index',
          name: 'Home',
          component: () => import('@/views/index/index.vue'),
        }
    ]
})

export default router
