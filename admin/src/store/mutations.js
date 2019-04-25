import { setStore } from '../config/utils'
export default {
    updateMenu (state, value) {
        this.state.menu = value
    },
    cacheFormData (state, value) {
        value.name && setStore(value.name, value.data, value.type);
        this.state.cacheForm = value.data;
    }
}