import {
    onGetShopInfo,
    onGetUser
} from '../service/getData';
import {
    GET_USERINFO,
    RECORD_SHOPINFO
} from './mutation-type.js';
import { getStore } from '../config/utils';

export default {
    async getUserInfo ({ commit, state }) {
        if (state.login || !getStore('user_id')) return;
        let res = await onGetUser(getStore('user_id'));
        commit(GET_USERINFO, res);
    },
    async getShopInfo ({ commit, state }) {
        if (state.shopInfo.member_id) return;
        let res = await onGetShopInfo();
        commit(RECORD_SHOPINFO, res);
    }
};
