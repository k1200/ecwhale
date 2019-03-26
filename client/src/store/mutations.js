import {
    RECORD_USERINFO,
    GET_USERINFO,
    RECORD_SHOPINFO
} from './mutation-type.js';

import {setStore, getStore} from '../config/utils';
export default {
    [RECORD_USERINFO] (state, info) {
        state.userInfo = info;
        state.login = true;
        setStore('user_id', info.user_id);
    },
    [RECORD_SHOPINFO] (state, info) {
        state.shopInfo = info;
    },
    [GET_USERINFO] (state, info) {
        state.userInfo = info;
        state.login = true;
    }
};
