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
// console.log(a.replace(/
/, ""))
    gethistory: api.gethistory,`;
let reg = /(?:^|
        |\r)\s*\/\/.*(?:\r|
        (?:\s*)|$)/g;
console.log(a.match(reg));
console.log( a.replace(reg, ""));


var str = "sssh和ssｓｓ"

var str2 = str.match(/[\uff00-\uffff]/g);

if (str != null) {
        console.log("以下字符" + str2 + "是全角字符");

}

let b = /industr(?:y|ies)/g;
console.log('industry dindustries'.match(b))

let str = `
{
        \"LogisticCode\" : \"YT2099477499243\",
          \"ShipperCode\" : \"YTO\",
            \"Traces\" : [ {
                      \"AcceptStation\" : \"【湖北省武汉市江夏区武大科技园公司】 已收件 取件人: 朱志登 (15972087420)\",
                          \"AcceptTime\" : \"2020-11-03 18:41:28\"
                  }, {
                                  \"AcceptStation\" : \"【湖北省武汉市洪山区科技园公司】 已收件 取件人: 刘凯 (15071078098)\",
                          \"AcceptTime\" : \"2020-11-03 19:18:44\"
                  }, {
                                  \"AcceptStation\" : \"【湖北省武汉市洪山区科技园】 已发出 下一站 【武汉转运中心公司】\",
                          \"AcceptTime\" : \"2020-11-03 19:18:54\"
                  }, {
                                  \"AcceptStation\" : \"【武昌转运中心公司】 已收入\",
                          \"AcceptTime\" : \"2020-11-03 20:38:11\"
                  }, {
                                  \"AcceptStation\" : \"【武昌转运中心】 已发出\",
                          \"AcceptTime\" : \"2020-11-03 21:28:11\"
                  }, {
                                  \"AcceptStation\" : \"【虎门转运中心公司】 已收入\",
                          \"AcceptTime\" : \"2020-11-05 00:36:08\"
                  }, {
                                  \"AcceptStation\" : \"【虎门转运中心】 已发出\",
                          \"AcceptTime\" : \"2020-11-05 01:26:08\"
                  }, {
                                  \"AcceptStation\" : \"【深圳转运中心公司】 已收入\",
                          \"AcceptTime\" : \"2020-11-05 15:52:03\"
                  }, {
                                  \"AcceptStation\" : \"【深圳转运中心】 已发出 下一站 【广东省深圳市宝安区灵芝公司】\",
                          \"AcceptTime\" : \"2020-11-05 15:55:06\"
                  }, {
                                  \"AcceptStation\" : \"【广东省深圳市宝安区灵芝公司】 已收入\",
                          \"AcceptTime\" : \"2020-11-05 18:07:35\"
                  }, {
                                  \"AcceptStation\" : \"【广东省深圳市宝安区灵芝公司】 派件中  派件人: 赵维军 电话 18521198836  如有疑问，请联系：0753-5182808\",
                          \"AcceptTime\" : \"2020-11-06 06:23:59\"
                  }, {
                                  \"AcceptStation\" : \"客户签收人: 刘亚西 已签收  感谢使用圆通速递，期待再次为您服务 如有疑问请联系：18521198836，投诉电话：0753-5182808\",
                          \"AcceptTime\" : \"2020-11-06 10:15:43\"
                  } ],
                        \"State\" : \"3\",
                        \"EBusinessID\" : \"1685222\",
                        \"Success\" : true
                }
                      `;
console.log(JSON.parse(str));
