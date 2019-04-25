// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import actions from './actions';
Vue.use(Vuex);

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
// import { fetchItem } from './api'

export const createStore = () => {
    return new Vuex.Store({
        state: {
            cacheForm: null
        },
        actions,
        mutations
    })
};