import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/addGoods',
            name: 'addGoods',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/goodsManage/addGoods.vue'),
            children: [
                {
                    path: '/',
                    redirect: 'basic'
                },
                {
                    path: 'basic',
                    name: 'basic',
                    component: () => import(/* webpackChunkName: "goodsBasic" */ '../views/goodsManage/children/basicAttr.vue')
                },
                {
                    path: 'special',
                    name: 'special',
                    component: () => import(/* webpackChunkName: "goodsSpecial" */ '../views/goodsManage/children/specialAttr.vue')
                }
            ]
        }
    ]
})
