const { ERROR_STATUS, NORMAL_STATUS } = require("./constUtils");
const isObject = params => Object.prototype.toString.call(params) === "[object Object]";
const isArray = params => Object.prototype.toString.call(params) === "[object Array]";
const isFun = params => typeof params === 'function';
const promiseAll = array => {
    return Promise.all(array)
        .then(res => res)
        .catch(error => error)
};
const getDate  = (time = new Date()) => {
    time = new Date(time);
    const timestamps = time.getTime();
    const datetime = {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        date: time.getDate(),
        ms: time.getMilliseconds(),
        s: time.getSeconds(),
        min: time.getMinutes(),
        h: time.getHours()
    };
    return { timestamps, datetime };
};

exports = module.exports = {
    isObject,
    isArray,
    isFun,
    promiseAll,
    getDate,
    returnRes (res, ...params) {
        if (params.length === 1 && isObject(params[0])) {
            res.json(params[0]);
        } else if (params.length >= 1) {
            let [status, code, message] = [2000, '', ''];
            for (value of params) {
                if (typeof value === 'string') {
                    message = value;
                } else {
                    code = value;
                    value = value.toString();
                    if (+value.slice(0, 1) === 1) {
                        status = ERROR_STATUS;
                    } else if (+value.slice(0, 1) === 2) {
                        status = NORMAL_STATUS;
                    }
                }
            }
            res.json({ message, status, code });
        } else {
            res.end('http end!');
        }
        res.end();
    }

};