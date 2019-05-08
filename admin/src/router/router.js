import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router);

export const createRouter = () => {
    return new Router({
        mode: 'history',
        // base: process.env.BASE_URL,
        routes: [
            {
                path: '',
                component: Home,
                meta: { title: '首页' },
            },
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: { title: '首页' },
            },
            {
                path: '/addGoods',
                meta: { title: '商品管理' },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/goodsManage/addGoods.vue'),
                children: [
                    {
                        path: '',
                        name: 'basic',
                        meta: { title: '添加商品' },
                        component: () => import(/* webpackChunkName: "goodsBasic" */ '../views/goodsManage/children/basicAttr.vue')
                    },
                    {
                        path: 'special',
                        name: 'special',
                        meta: { parent: '/addGoods', title: '添加商品' },
                        component: () => import(/* webpackChunkName: "goodsSpecial" */ '../views/goodsManage/children/specialAttr.vue')
                    }
                ]
            },
            {
                path: '/goodsList',
                name: 'goodsList',
                meta: { title: '商品列表' },
                component: () => import(/* webpackChunkName: "goodsList" */ '../views/goodsManage/goodsList.vue')
            },
            {
                path: '/login',
                name: 'login',
                meta: { title: '登录' },
                component: () => import(/* webpackChunkName: "login" */ '../views/loginInfo/login.vue')
            }
        ]
    })
};
