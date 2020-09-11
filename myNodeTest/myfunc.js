import btoa from 'btoa';
import atob from 'atob';
import {resolve} from 'path';
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
export function buildCookie(name, value,
    /** date default now (all values is '0')
     * @type {{ year:number, month:number, day:number, minutes:number,seconds:number, milliseconds:number }}  */
    { year = 0, month = 0, day = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {},
    path = undefined, httponly = false) {
    let date = new Date();
    date.setFullYear(date.getFullYear() + year);
    date.setMonth(date.getMonth() + month);
    date.setDate(date.getDate() + day);
    date.setMinutes(date.getMinutes() + minutes);
    date.setSeconds(date.getSeconds() + seconds);
    date.getTime(date.getTime() + milliseconds);
    let cookie = `${name}=${value};expires=${date};${(path == undefined ? '' : `path = ${path};`)}${(httponly ? 'httponly' : '')}`;
    console.log(encodeURI(cookie));
    return encodeURI(cookie);
}
export function btoaEncrypt(str, times = 1) {
    for (let i = 0; i < times; i++) {
        str = btoa(str);
    }
    return str;
}
export function atobDecrypt(str, times = 1) {
    for (let i = 0; i < times; i++) {
        str = atob(str);
    }
    return str;
}
export var __dirname = resolve();
