exports = module.exports = {
    jsonReturn (result, msg = '', success = true) {
        return {result, msg, success};
    },
    jsonError (result) {
        return {result, msg: '系统错误，请联系网管！', success: false};
    }
};
