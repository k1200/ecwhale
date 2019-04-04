/**
 * 存储localStorage
 **/
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 **/
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 **/
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
};

/**
 * 获取时间戳（豪秒）
 * */
export const getDateTimestamp = (time = new Date()) => {
    if (typeof time === 'number' || typeof time === 'string' || time instanceof Date) {
        return new Date(time).getTime();
    } else {
        return NaN;
    }
};

/**
 * 日期时间处理
 * */
export const getDateTime = (time = new Date()) => {
    if (typeof time === 'number' || typeof time === 'string' || time instanceof Date) {
        let datetime = new Date(time);
        return { year: datetime.getFullYear(), month: datetime.getMonth() + 1, date: datetime.getDate(), h: datetime.getHours(), min: datetime.getMinutes(), s: datetime.getSeconds(), ms: datetime.getMilliseconds()}
    } else {
        return null;
    }
} ;

/**
 * 获取时间间隔
 * */
const getTimeInfo = intervalTime => {
    // 1s = 1000ms, 1min = 60s, 1h = 60min, 1d = 24h
    let [_s, _min = _s * 60, _h = _min * 60, _d = _h *24] = [1000];
    let d = Math.floor(intervalTime / _d); // 天
    let ms = intervalTime % _s; // 毫秒
    let s = (intervalTime % _min - ms) / _s; // 秒
    let min = ((intervalTime % _h) - (s * _s + ms))  / _min; // 分钟
    let h = Math.floor((intervalTime - d * _d) / _h); // 时
    return {
        d: d < 10 ? '0' + d : d,
        h: h < 10 ? '0' + h : h,
        min: min < 10 ? '0' + min: min,
        s: s < 10 ? '0' + s : s,
        ms,
        intervalTime
    };
};

/**
 * timeout
 * */
export const timeoutPromise = (ms, callback) => new Promise(resolve =>{
    const timeout = setTimeout(() => {
        if (typeof callback === 'export const ') {
            callback;
        }
        resolve(timeout);
    }, ms)
});

/**
 * 轮询
 * */
export const intervalTimePromise = (ms, callback) => new Promise(resolve => {
    const interval = setInterval(() => {
        if (typeof callback === 'export const ') {
            callback;
        }
        resolve(interval);
    }, ms)
});

/**
 * 倒计时函数
 * */
export const getIntervalTime = (callback, first_time = getDateTimestamp(), second_time = getDateTimestamp()) => {
    let [intervalTime, cacheIntervalTime = intervalTime] = [Math.abs(getDateTimestamp(first_time) - getDateTimestamp(second_time))];
    let status = {
        pending: false, // true: 启动倒计时
        pause: false, // true：暂停倒计时，false: 重启倒计时
        reset: false, // true：重置倒计时
        stop: false // true: 停止倒计时
    };
    let [pending, pause, stop, reset] = [false, false, false, false];
    let timeout = '';
    let interval = () => {
        (async function f () {
            if (status.stop) return false;
            timeout = setTimeout(() => {
                callback(getTimeInfo(intervalTime -= 1000));
                if (intervalTime > 1000) f();
            }, 1000);
        }());
    };
    Object.defineProperties(status, {
        pending: {
            set (value) { // 开始倒计时
                value && interval();
                pending = value;
            },
            get () {
                return pending;
            }
        },
        pause: {
            set (value) {
                if (!value) { // 倒计时重启
                    interval();
                } else { // 暂停倒计时
                    clearTimeout(timeout);
                }
                pause = value;
            },
            get () {
                return pause;
            }
        },
        reset: {
            set (value) {
                if (value) {
                    intervalTime = cacheIntervalTime
                }
            }
        }
    });
    callback(getTimeInfo(intervalTime));

    return status;
};

/**
 * 验证手机号码（国内）
 * */
export const isTel = tel => {
    let pattern = /^1[3456789]\d{9}$/;
    return pattern.test(tel);
};

/**
 * 验证邮箱
 * */
export const isEmail = email => {
    let pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return pattern.test(email);
};

/**
 * 验证身份证号
 * */
export const isIDNumber = number => {
    let pattern = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (pattern.test(number)) {
        //身份证第7到14位是出生日期
        let year = number.substring(6, 10);
        let current_year = new Date().getFullYear();
        if ((year > 1920) && (year < current_year)) {
            let month = number.substring(10, 12);
            let day = number.substring(12, 14);
            if (!isNaN(Date.parse(year + '/' + month + '/' + day))) {
                return true;
            }
        }
    }
    return false;
};

/**
 * 是否为空
 * */
export const isEmpty = (checkString) => {
    return !checkString || checkString.trim().length === 0
};

/**
 * 是否为数字
 * */
export const isNumber = (numberString) => {
    let pattern = /^\d+$/;
    return pattern.test(numberString)
};

/**
 * 是否为整数
 * */
export const isInteger = (intString) => {
    let pattern = /^[-+]?\d*$/;
    return pattern.test(intString)
};

/**
 * 是否为纯英文字符串
 * */
export const isEnglishLetter = (letterString) => {
    let pattern = /^[a-zA-Z]+$/;
    return pattern.test(letterString)
};

/**
 * 是否为纯中文
 * */
export const isChineseCharacter = (characterString) => {
    let pattern = /^[\u4E00-\u9FA5]{1,6}$/;
    return pattern.test(characterString)
};


/*
function isAcademicCertNumber(certNumber) {
    if (isForeignDegreeCertNumber(certNumber))
        return true;

    if (isReplacedDegreeCertNumber(certNumber))
        return true;

    let pattern = /(^[156789]\d{16}$)|(^[156789]\d{17}$)/;
    //let pattern = /(^\d{17}$)|(^\d{18}$)/;
    if (pattern.test(certNumber)) {
        let firstNumber = parseInt(certNumber.substring(0, 1));
        if (firstNumber === 6) {
            //自学考试文凭的第二位是学历层次
            let secondNumber = parseInt(certNumber.substring(1, 2));
            if ((secondNumber > 0) && (secondNumber < 7)) {
                return true;
            }
        } else {
            //学历证第7至10位为年份
            let year = certNumber.substring(6, 10);
            let current_year = new Date().getFullYear();
            if ((year > 1990) && (year <= current_year)) {
                return true;
            }
        }
    }
    return false;
}

function isDegreeMatchCertNumber(degreeLevel, certNumber) {
    if (isForeignDegreeCertNumber(certNumber))
        return true;

    if (isReplacedDegreeCertNumber(certNumber))
        return true;

    degreeLevel = parseInt(degreeLevel);
    let pattern = /(^[156789]\d{16}$)|(^[156789]\d{17}$)/;
    if (pattern.test(certNumber)) {
        //非自考学历证第11至第12位是学历级别，自考学历证第2位是级别
        let degreeLevelFromCert = 0;
        let firstNumber = parseInt(certNumber.substring(0, 1));
        if (firstNumber === 6) {
            degreeLevelFromCert = parseInt(certNumber.substring(1, 2));
        } else {
            degreeLevelFromCert = certNumber.substring(10, 12);
        }

        degreeLevelFromCert = parseInt(degreeLevelFromCert);
        //站内的学历级别和官方有差别，要区分对比
        if (degreeLevel === 1 || degreeLevel === 2) {
            return degreeLevel === degreeLevelFromCert
        } else if (degreeLevel === 3) {
            return degreeLevelFromCert === 4 || degreeLevelFromCert === 5;
        } else if (degreeLevel === 4) {
            return degreeLevelFromCert === 6;
        }
    }

    return false;
}*/

//format is yyyy-mm-dd
// function isDate(dateStr) {
//     var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
//     return rxDatePattern.test(dateStr)
// }