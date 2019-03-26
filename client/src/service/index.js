import axios from 'axios';
import { baseUrl } from '../config/env';
import qs from 'qs';
import { Loading } from 'element-ui' // 引入加载层

axios.defaults.withCredentials = true;
let loadingInstance = null;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    loadingInstance = Loading.service();
    let url = config.url;
    if (!url.match(/^http/)) {
        config.url = baseUrl + url;
    }
    if (config.method === 'post') { // post请求时，处理数据
        if (config.contentType === 'json') {
            config.headers['Content-Type'] = 'application/json'
        } else {
            config.data = qs.stringify({
                ...config.data // 后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
            })
        }
    }
    return config
}, function (error) {
    console.log(error);
    return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        loadingInstance.close();
        if (response.status === 200) {
            let data = response.data;
            if (data) {

            }
            return data
        } else {
            return response.status
        }

    }, error => {
        loadingInstance.close();
        let code = error.message.match(/code\s+\d+/)[0].split(" ")[1];
        switch (+code) {
            case 401:
                console.log(401);
                break;
            case 404:
                console.log(404);
                break;
            case 500:
                console.log(500);
                break;
        }
        return Promise.reject(error)
    });

const $ajax = (url, params, method = 'get', config = null) => {
    let $promise = null;

    if (method === 'get') {
        $promise = new Promise(function (resolve, reject) {
            axios.get(url, {
                params: params
            })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    } else if (method === 'post') {
        $promise = new Promise(function (resolve, reject) {
            axios.post(url, params, config)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }
    return $promise
};
$ajax.all = (arr, fun) =>{
    axios.all(arr)
        .then(axios.spread(fun))
};

export default $ajax;
