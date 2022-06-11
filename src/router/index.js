import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/student',
        redirect: '/student/login',
    },
    {
        path: '/student/login',
        name: 'studentLogin',
        component: () => import('../views/StudentLogin.vue'),
    },
    {
        path: '/teacher',
        redirect: '/teacher/login',
    },
    {
        path: '/teacher/login',
        name: 'teacherLogin',
        component: () => import('../views/TeacherLogin.vue'),
    },
    {
        path: '/admin',
        redirect: '/admin/login',
    },
    {
        path: '/admin/login',
        name: 'adminLogin',
        component: () => import('../views/AdminLogin.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
