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
export const timeoutPromise = ms => new Promise(resolve => setTimeout(() => resolve(), ms));
export const intervalTimePromise = ms => new Promise(resolve => {
    const interval = setInterval(() => resolve(), ms)
});

export const getIntervalTime = (callback, first_time = getDateTimestamp(), second_time = getDateTimestamp()) => {
    let intervalTime = Math.abs(getDateTimestamp(first_time) - getDateTimestamp(second_time));
    let status = {
        pending: false, // true: 启动倒计时
        pause: false, // true：暂停倒计时，false: 重启倒计时
        stop: false // true: 停止倒计时
    };
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
            }
        },
        pause: {
            set (value) {
                if (!value) { // 倒计时重启
                    interval();
                } else { // 暂停倒计时
                    clearTimeout(timeout);
                }
            }
        }
    });
    callback(getTimeInfo(intervalTime));

    return status;
};
