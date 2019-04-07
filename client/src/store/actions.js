import {
    onGetShopInfo,
    onGetShopDetails,
    onGetUser,
    onGetCategory
} from '../service/getData';
import {
    GET_USERINFO,
    RECORD_SHOPINFO,
    SAVE_CATEGORY
} from './mutation-type.js';
import { getStore } from '../config/utils';

export default {
    async getUserInfo ({ commit, state }) {
        if (state.login || !getStore('user_id')) return;
        let res = await onGetUser(getStore('user_id'));
        commit(GET_USERINFO, res);
    },
    async getShopDetails ({ commit, state }) {
        if (state.shopInfo.member_id) return;
        let res = await onGetShopDetails();
        commit(RECORD_SHOPINFO, res);
    },
    async getCategory ({ commit, state }) {
        if (state.categories.length > 0) return;
        let res = await onGetCategory();
        commit(SAVE_CATEGORY, res);
    }
};
