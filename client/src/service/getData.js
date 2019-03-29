import axios from './index';
import { getStore } from '../config/utils'

/**
 * 获取当前门店信息
 * */
export const onGetShopInfo = () => axios('getShopInfo');

/**
 * 登录
 * */
export const onLogin = params => axios('login', params, 'post');

/**
 * 获取用户信息
 * */
export const onGetUser = id =>axios(`getUserInfo/${id}`);

/**
 * 获取首页数据
 * */
export const onGetHomeData = () => axios('getHomeData');

/**
 * 退出登录
 * */
export const onLogout = () => axios('logout');

/**
 * 获取购物车列表
 * */
export const onGetCartList = () => axios(`getCartList/${getStore('user_id')}`);

/**
 * 将商品加入购物车
 * */
export const onAddCart = count => axios(`addCart/${getStore('user_id')}/${count}`);