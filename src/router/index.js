import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/home',
        component: () => import('@/views/Home/index.vue')
    },
    {
        path: '/editable',
        component: () => import('@/views/demo/editable.vue')
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})