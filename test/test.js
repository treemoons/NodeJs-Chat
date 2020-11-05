console.log('test.mjs module');
export default function () {
        console.log('test')
    
}

const { ipcRenderer } = require('electron')

document.getElementById('quit').onclick = e => {
        //在渲染器进程 (网页) 中。
        ipcRenderer.on('asynchronous-reply', (event, arg) => {
                console.log(arg) // prints "pong"
        })
        ipcRenderer.send('asynchronous-message', 'newtest.html发送过来的文字')
}

console.log(" %ct %cest", "color:red", "color:blue")
console.log('\x1b[36m%s', 'I am cyan');  //cyan

console.log('test')
console.log('\x1b[43m%s\x1b[0m', "stringToMakeYellow");  //yellow
console.log("\x1b[35;3;1m%s #eab10e", "test");


let a = `
import api from './apifunction.js';

import api from './apifunction.js';
/** 默认是需要登录才能使用 */
export default {
    default: api.default,
    chatto: api.chatto,
    login: api.login,
    /**加载所有的聊天记录，截止到未读或今天凌晨 */
    loaddata: api.loaddata,
    /**查找历史信息记录
     * POST: { peername: string, ignorecount: number , requestcount: number}
     */
    gethistory: api.gethistory,
    //**加载所有的聊天记录，截止到未读或今天凌晨 */
    loaddata: api.loaddata,
    /**查找历史信息记录
     * POST: { peername: string, ignorecount: number , requestcount: number}
     */
// console.log(a.replace(/\n/, ""))
    gethistory: api.gethistory,`;
let reg = /(?:^|\n|\r)\s*\/\/.*(?:\r|\n(?:\s*)|$)/g;
console.log(a.match(reg));
console.log( a.replace(reg, ""));


var str = "sssh和ssｓｓ"

var str2 = str.match(/[\uff00-\uffff]/g);

if (str != null) {
        console.log("以下字符" + str2 + "是全角字符");

}

let b = /industr(?:y|ies)/g;
console.log('industry dindustries'.match(b))


