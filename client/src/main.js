import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import ElementUI from 'element-ui';
import '../element-variables.scss';
import axios from './service/index';

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

