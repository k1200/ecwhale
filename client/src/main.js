import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// axios.defaults.withCredentials = true; // 每次请求，无论是否跨域，都带上cookie信息
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

