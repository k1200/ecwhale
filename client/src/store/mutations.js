import {
    RECORD_USERINFO,
    GET_USERINFO,
    RECORD_SHOPINFO,
    SAVE_CATEGORY
} from './mutation-type.js';

import {setStore, getStore, removeStore} from '../config/utils';
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
        if (info) {
            state.userInfo = info;
            state.login = true;
        } else {
            state.userInfo = {};
            state.login = false;
            removeStore('user_id');
        }

    },
    [SAVE_CATEGORY] (state, info) {
        state.categories = info;
    }
};
