import { resolve } from 'path';
export async function getQueryString(name, purposeString, splitMark) {
    let reg = RegExp(`${name}=([^${splitMark}]+)`);
    let arr = purposeString.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return undefined;
    }
}
export async function getAllQueryString(purposeString, splitMark) {
    let reg = RegExp(`${name}=([^${splitMark}]+)`);
    return purposeString.match(reg);
}
/**
 * 
 * @param {string} name 
 * @param {string} value 
 * @param {{year:number, month:number, day:number, hour:number,minutes:number,seconds:number, milliseconds:number }} param2 date default now (all values is '0')
 * @param {string} path 
 * @param {boolean} httponly 
 */
export function buildCookie(name, value,
    isexpiresdefault=true,
    { year = 0, month = 0, day = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {},
    path = undefined, httponly = false) {
    if (!isexpiresdefault) {
        let date = new Date();
        date.setFullYear(date.getFullYear() + year);
        date.setMonth(date.getMonth() + month);
        date.setDate(date.getDate() + day);
        date.setHours(date.getHours() + hours);
        date.setMinutes(date.getMinutes() + minutes);
        date.setSeconds(date.getSeconds() + seconds);
        date.setMilliseconds(date.getMilliseconds() + milliseconds);
    }
    let cookie = `${name}=${value};${isexpiresdefault ? '' :`expires=${ date };`}${(path == undefined ? '' : `path = ${path};`)}${(httponly ? 'httponly' : '')}`;
    console.log(encodeURI(cookie));
    return encodeURI(cookie);
}
export async function btoaEncrypt(str, times = 1) {
    for (let i = 0; i < times; i++) {
        str = Buffer.from(str, 'base64').toString('ascii')
    }
    return str;
}
export async function atobDecrypt(str, times = 1) {
    for (let i = 0; i < times; i++) {
        str = Buffer.from(str, 'ascii').toString('base64')
    }
    return str;
}
export var __dirname = resolve();
/**
 * date default now (all values is '0')
 * @param {{ year:number, month:number, day:number,hours:number , minutes:number,seconds:number, milliseconds:number }}  
 */
export function getSpanDate(
    { years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {}) {
    let date = new Date();
    date.setFullYear(date.getFullYear() + years);
    date.setMonth(date.getMonth() + months);
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    date.setSeconds(date.getSeconds() + seconds);
    date.setMilliseconds(date.getMilliseconds() + milliseconds);
    return date;
}
/**当天获取凌晨时间 */
export function getTodayDawn() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
/**
 * @param {string} fmt 毫秒不可设置位数
 */
Date.prototype.formatDate = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份           
        "d+": this.getDate(), //日           
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
        "H+": this.getHours(), //小时           
        "m+": this.getMinutes(), //分           
        "s+": this.getSeconds(), //秒           
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
        "f": this.getMilliseconds() //毫秒           
    };
    let week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}