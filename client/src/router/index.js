import Vue from 'vue';
import Router from 'vue-router';
import { routerMode } from '../config/env'
import App from '../App';
Vue.use(Router);

const login = () => import(/* webpackChunkName: "login" */ '@views/login/login.vue');
const home = () => import(/* webpackChunkName: "home" */ '@views/home/home.vue');

const routes = [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        {
            path: 'home',
            component: home
        },
        //登录注册页
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录'
            }
        }
    ]
}];

const router = new Router({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production'
});

router.beforeEach((to, from, next) => {
    let token = sessionStorage.getItem('token'); // 获取本地存储的token
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (token) {
            next()
        } else {
            next({ path: '/' }) // 将跳转的路由path作为参数，登录成功后跳转到该路由
        }
    } else {
        next()
    }
});

export default router