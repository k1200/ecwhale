import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex)

const state = {
    login: false, // 是否登录
    userInfo: {}, // 用户信息
    shopInfo: {}, // 商家信息
    categories: [], // 产品分类

    newAddress: [], // 确认订单页新的地址
    choosedAddress: null, // 选择地址
    addressIndex: null, // 选择地址的索引值
    cartId: null, // 购物车id
    sig: null, // 购物车sig
    cartList: {}, // 加入购物车的商品列表
    orderParam: null, // 订单的参数
    orderMessage: null, // 订单返回的信息
    orderDetail: null, // 订单详情
    imgPath: null, // 头像地址
    removeAddress: [],// 移除地址
    addAddress: '' // 新增地址
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})