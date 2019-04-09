const crypto = require('crypto');
const { ERROR_STATUS, NORMAL_STATUS, SYSERROR, SQL_ERROR } = require("./constUtils");
const isObject = params => Object.prototype.toString.call(params) === "[object Object]";
const isArray = params => Object.prototype.toString.call(params) === "[object Array]";
const isFun = params => typeof params === 'function';
const isMap = params => Object.prototype.toString.call(params) === "[object Map]";
const promiseAll = array => {
    return Promise.all(array)
        .then(res => res)
        .catch(error => error)
};

/**
 * @desc 获取时间对象
 * @param {string|number|object} [time = new Date()]
 * @returns: {object} b
 * @return: {number} b.timestamps 时间戳
 * @return: {object} b.datetime 时间对象
 * @return: {number} b.datetime.year|b.datetime.month|b.datetime.date|b.datetime.ms|b.datetime.s|b.datetime.min|b.datetime.h
 * */
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

/**
 * @desc 获取sql存储时间
 * @param {string|number} [time] 时间
 * @returns xxxx-xx-xx xx:xx:xx
 * */
const getMysqlDate = time => {
    let datetime = getDate(time).datetime;
    return `${datetime.year}-${datetime.month}-${datetime.date} ${datetime.h}:${datetime.min}:${datetime.s}`;
};

/**
 * @desc 创建一个错误
 * @param {number} error_code 错误码
 * @param {object} error 错误对象
 * @return {number} 错误码
 * */
const createError = (error_code, error) => {
    console.log(error);
    return error_code;
};

const sqlReturn = data => {
    return [true, data];
};
const sqlReturnError = (error) => {
    return [false, createError(SQL_ERROR, error)];
};

/**
 * @desc 将结果返回给客户端
 * @param {object} res 客户端响应对象
 * @param {array|boolean} result sql查询结果（第一个元素表示sql执行是否正确，第二个元素sql执行正确时返回给客户端的数据，默认为result）
 * @param params
 * @param {...string} [[message] 提示信息，
 *                    [number] status 错误类型，
 *                    [number] code 错误码 ]
 *                    |
 *                    [object] 对象
 * */
const returnRes = (res, result, ...params) => {
    let [status, code, message] = [2000, '', ''];
    let res_status = value => {
        if (typeof value === 'string' && isNaN(value)) {
            message = value;
        } else {
            code = value;
            value = value.toString();
            value = +value.slice(0, 1);
            if (value === 1) {
                status = ERROR_STATUS;
            } else if (value === 2) {
                status = NORMAL_STATUS;
            } else if (value === 4) {
                status = SYSERROR;
                message = `系统错误，请联系管理员！<br/>ERROR CODE：${code}`
            }
        }
    };
    if ((isArray(result) && result[0]) || result) {
        if (params.length === 0 && isArray(result)) {
            if (isObject(result[1]) || isMap(result[1])) {
                return res.json(result[1]);
            } else {
                if (isArray(result[1])) {
                    return res.json(result[1]);
                }
                res_status(result[1]);
                return res.json({ message, status, code });
            }
        } else if (params.length === 1 && isObject(params[0])) {
            return res.json(params[0]);
        } else if (params.length >= 0) {
            for (value of params) {
                res_status(value);
            }
            if (params.length === 0) res_status(result[1]);
            return res.json({ message, status, code });
        }
    } else {
        if (isArray(result)) {
            res_status(result[1]);
            return res.json({ message, status, code });
        } else {
            for (value of params) {
                res_status(value);
            }
            return res.json({ message, status, code });
        }
    }
};

/**
 * @desc hash 加密
 * @form http://nodejs.cn/api/crypto.html#crypto_class_hash
 * @param {string|string[]} text 需要加密的文本(第一个元素为绝对加密文本，后面的元素是为了增加复杂度)
 * @param {string} [type = 'md5'] hash 加密类型
 * @param {string} [digest = 'hex'] 计算所有需要被哈希化的数据摘要(hex, latin1, base64)
 * @returns {string} hash 字符串
 * */
const createCryptoMd5 = (text, type = 'md5', digest = 'hex' ) => {
    // （md5, sha1，sha256, sha512）是一种常用的哈希算法，用于给任意数据一个“签名”。
    let hash = crypto.createHash(type);
    if (isArray(text)) {
        for(let value of text) {
            if (typeof value !== 'string') value = value.toString();
            hash.update(value);
        }
    } else {
        if (typeof text !== 'string') text = text.toString();
        hash.update(text);
    }
    return hash.digest(digest);
};

/**
 * @desc 对称加密 AES是一种常用的对称加密算法，加解密都用同一个密钥
 * @form http://nodejs.cn/api/crypto.html#crypto_class_cipher
 * @param {string|string[]} text 需要加密的文本(第一个元素为绝对加密文本，后面的元素是为了增加复杂度)
 * @param {string} key 加密向量，也称为 加盐（绝对隐私，解密需要用到）
 * @param {string} [type='aes-256-cfb'] 加密方式(可通过 crypto.getCiphers() 获取到crypto支持的所有加密方式)
 * @param {string} [final = 'hex'] 计算所有需要被哈希化的数据摘要(hex, latin1, base64)
 * @returns {string} 加密后的字符串
 * */
const createCryptoCipher = (text, key, type = 'aes-256-cfb', final = 'hex') => {
    const cipher = crypto.createCipher(type, key); // 创建 cipher 实例
    let encrypted = '';
    if (isArray(text)) {
        for(let value of text) {
            if (typeof value !== 'string') value = value.toString();
            encrypted += cipher.update(value, 'utf8', final);
        }
    } else {
        if (typeof text !== 'string') text = text.toString();
        encrypted += cipher.update(text, 'utf8', final);
    }

    encrypted += cipher.final(final);
    return encrypted;
};

/**
 * @desc 对称解密
 * @form http://nodejs.cn/api/crypto.html#crypto_class_decipher
 * @param {string|string[]} text 需要解密的文本(第一个元素为绝对加密文本，后面的元素是为了增加复杂度)
 * @param {string} key 解密向量（必须与加密时的key相同）
 * @param {string} [type='aes-256-cfb'] 解密方式（必须与加密时的type相同）
 * @param {string} [final = 'hex'] 计算所有需要被哈希化的数据摘要(hex, latin1, base64)
 * @returns {string} 解密后的字符串
 * */
const createCryptoDecipher = (text, key, type = 'aes-256-cfb', final = 'hex') => {
    const decipher = crypto.createDecipher(type, key);
    let decrypted = '';
    if (isArray(text)) {
        for(let value of text) {
            if (typeof value !== 'string') value = value.toString();
            decrypted = decipher.update(value, final, 'utf8');
        }
    } else {
        if (typeof text !== 'string') text = text.toString();
        decrypted = decipher.update(text, final, 'utf8');
    }
    decrypted += decipher.final('utf8');
    return decrypted
};

exports = module.exports = {
    isObject,
    isArray,
    isFun,
    promiseAll,
    getDate,
    createError,
    returnRes,
    createCryptoMd5,
    createCryptoCipher,
    createCryptoDecipher,
    getMysqlDate,
    sqlReturn,
    sqlReturnError
};
