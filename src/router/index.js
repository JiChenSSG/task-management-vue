import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../views/HomeView.vue'),
        children: [
            {
                path: 'student',
                name: 'student',
                component: () => import('../views/StudentView.vue'),
            },
            {
                path: 'admin',
                name: 'admin',
                component: () => import('../views/AdminView.vue'),
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
