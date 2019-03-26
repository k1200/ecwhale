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
export const onGetUser = () =>axios(`getUserInfo/${getStore('user_id')}`);

/**
 * 获取首页数据
 * */
export const onGetHomeData = () => axios('getHomeData');