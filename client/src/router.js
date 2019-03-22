import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {

            }
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
export default router;
