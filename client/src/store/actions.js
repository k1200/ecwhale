import {
    onGetShopInfo,
    onGetUser
} from '../service/getData';
import {
    GET_USERINFO,
    RECORD_SHOPINFO
} from './mutation-type.js';

export default {
    async getUserInfo ({ commit, state }) {
        if (state.login) return;
        let res = await onGetUser();
        commit(GET_USERINFO, res);
    },
    async getShopInfo ({ commit, state }) {
        if (state.member_id) return;
        let res = await onGetShopInfo();
        commit(RECORD_SHOPINFO, res);
    }
};
