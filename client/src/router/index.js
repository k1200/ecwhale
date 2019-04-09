import Vue from 'vue';
import Router from 'vue-router';
import { routerMode } from '../config/env'
import App from '../App';
Vue.use(Router);

const login = () => import(/* webpackChunkName: "login" */ '@views/login/login.vue');
const register = () => import(/* webpackChunkName: "register" */ '@views/register/register.vue');
const forgetPassword = () => import(/* webpackChunkName: "forgetPassword" */ '@views/forgetPassword/forgetPassword.vue');
const home = () => import(/* webpackChunkName: "home" */ '@views/home/home.vue');
const products = () => import(/* webpackChunkName: "products" */ '@views/products/products.vue');
const goodsDetails = () => import(/* webpackChunkName: "goodsDetails" */ '@views/goodsDetails/goodsDetails.vue');

const header = () => import(/* webpackChunkName: "header" */ '@c/headerTop.vue');
const footer = () => import(/* webpackChunkName: "footer" */ '@c/footerMin.vue')

const routes = [{
    path: '/',
    components: {
        default: App,
        header: header,
        footer: footer
    }, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        // 首页
        {
            path: 'home',
            component: home
        },
        //登录页
        {
            path: '/login',
            component: login,
            meta: {
                title: '登录'
            }
        },
        // 注册
        {
            path: '/register',
            component: register,
            meta: {
                title: '注册'
            }
        },
        // 忘记密码
        {
          path: '/forgetPassword',
          component: forgetPassword,
          meta: {
              title: '忘记密码'
          }
        },
        // 产品列表
        {
            path: '/products/:id',
            component: products,
            meta: {
                title: '产品列表'
            }
        },
        // 商品详情
        {
            path: '/goodsDetails/:id',
            component: goodsDetails,
            name: 'goodsDetails'
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
