import {
    onGetUser
} from '../service/getData';
import {
    GET_USERINFO
} from './mutation-type.js';

export default {
    async getUserInfo ({ commit, state }) {
        if (state.login) return;
        let res = await onGetUser();
        commit(GET_USERINFO, res);
    }
};