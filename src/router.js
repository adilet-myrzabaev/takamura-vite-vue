import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/landing.vue'),
        meta: {
            layout: 'login'
        }
    },
    {
        path: '/sets',
        name: 'sets',
        component: () => import('./components/Product/Sets.vue'),
    },
    {
        path: '/sushi',
        name: 'sushi',
        component: () => import('./components/Product/Sushi.vue'),
    },
    {
        path: '/rolls',
        name: 'rolls',
        component: () => import('./components/Product/Rolls.vue'),
    },
    {
        path: '/warmRolls',
        name: 'warmRolls',
        component: () => import('./components/Product/WarmRolls.vue'),
    },
    {
        path: '/maki',
        name: 'maki',
        component: () => import('./components/Product/Maki.vue'),
    },
    {
        path: '/salads',
        name: 'salads',
        component: () => import('./components/Product/Salads.vue'),
    },
    {
        path: '/drinks',
        name: 'drinks',
        component: () => import('./components/Product/Drinks.vue'),
    },
    {
        path: '/sauces',
        name: 'sauces',
        component: () => import('./components/Product/Sauces.vue'),
    },
    {
        path: '/orders',
        name: 'orders',
        component: () => import('./components/Orders.vue'),
    },
    {
        path: '/floatlabel',
        name: 'floatlabel',
        component: () => import('./components/FloatLabelDemo.vue'),
    },
    {
        path: '/',
        name: 'auth',
        component: () => import('./pages/login/auth.vue'),
        meta:{
            layout: 'login'
        }
    },
    {
        path: '/login/register',
        name: 'register',
        component: () => import('./pages/login/register.vue'),
        meta:{
            layout: 'login'
        }
    },
    {
        path: '/login/reset-password/check',
        name: 'check',
        component: () => import('./pages/login/reset-password/check.vue'),
        meta:{
            layout: 'login'
        }
    },
    {
        path: '/login/reset-password/reset',
        name: 'reset',
        component: () => import('./pages/login/reset-password/reset.vue'),
        meta:{
            layout: 'login'
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('./pages/Admin.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
