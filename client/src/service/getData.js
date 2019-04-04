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
export const onGetUser = id => axios(`getUserInfo/${id}`);

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
 * @params params { ec_goods_id, goods_id, count }
 * */
export const onAddCart = params => axios('addCart', params);

/**
 * 获取商品详情
 * @params id 商品id
 * */
export const onGetGoodsDetails = id => axios(`getGoodsDetails/${id}`);

/**
 * 获取商品类目
 * */
export const onGetCategory = () => axios('getCategory');

/**
 * 获取手机验证码
* */
export const onGetTelCode = tel => axios(`getTelCode/${tel}`);

/**
 * 获取图形验证码
 * */
export const onGetImgCode = () => axios('getImgCode');

/**
 * 验证手机号码是否注册
 * */
export const onIsRegister = tel => axios(`isRegister/${tel}`);

/**
 * 注册账号
 * */
export const onRegister = params => axios('register', params, 'post');