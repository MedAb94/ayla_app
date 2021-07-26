import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/settings',
        name: 'Parametre',
        component: () => import('../views/Settings')
    },
    {
        path: '/caisse',
        name: 'Casse',
        component: () => import('../views/caisse/Index'),
        redirect: {name: "CaisseStatus"},
        children: [
            {
                path: 'status',
                name: 'CaisseStatus',
                component: () => import('../views/caisse/Status')
            },
            {
                path: 'history',
                name: 'MemberHistory',
                component: () => import('../views/caisse/History')
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
