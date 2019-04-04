/**
 * status 200 code
 * */

exports = module.exports = {
    /**
     * status 200 error code
     * */
    ERROR_STATUS: 1000, // 数据有误
    PASSWORD_ERROR: 1001, // 密码错误
    TELCODE_ERROR: 1002, // 手机验证码错误
    IMGCODE_ERROR: 1003, // 图形验证码错误
    PASSRULE_ERROR: 1004, // 密码格式错误

    /**
     * status 200 succeed code
     * */
    NORMAL_STATUS: 2000, // 常规状态
    LOGOUT: 2001, // 退出登录或登录过期
    ISREGISTER: 2002, // 手机号码已注册

    /**
     * 数据库配置
     * */
    DBCONF: {
        host     : '39.108.56.66',
        // port     : '3306',
        user     : 'root',
        password : 'wNstEunF78sZmX9m',
        database : 'sakujima'
    }
};