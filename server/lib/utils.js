/**
 * status 200 error code
 * */
const PASSWORD_ERROR = 1001; // 密码错误
const LOGOUT = 1000; // 退出登录

const DBCONF = {
    host     : '39.108.56.66',
    // port     : '3306',
    user     : 'root',
    password : 'wNstEunF78sZmX9m',
    database : 'sakujima'
};

exports = module.exports = {
    PASSWORD_ERROR,
    LOGOUT,

    promiseAll (array) {
        return Promise.all(array)
            .then(res => res)
            .catch(error => error)
    },
    DBCONF
};



// const ERROR_TYPE = 'error_type';
// const HOT_GOODS_TYPE = 'hot_goods_type';
// const CATEGORY_TYPE = 'category_type';
//
// exports = module.exports = {
//     [ERROR_TYPE]: {
//         sql: 1
//     },
//     [HOT_GOODS_TYPE]: {
//         hot: 1, // 爆款
//         floor: 2 // 楼层
//     },
//     CATEGORY_TYPE: {
//
//     }
// };