import *as test from './mymine.js';
console.log(test['default'])

const { ipcRenderer, Notification } = require('electron')


/**
 * 每   一个input的file都对应files是多个文件，必须使用files[0]来设置和获取单个文件属性
 * 可以在标签中使用multiple多选
 *  accept="image/jpeg,image/png,image/gif" 类型
 * @type {HTMLInputElement} 
 */
// let pic = fileform.filepic;
// async function test(e) {
//     console.log(pic.files);
// /**
//  * @type {FileList[0]}
//  */
// let file = pic.files[0];
// let datas = await file.arrayBuffer();
// let text = await file.text();
// let a = {
//     'Content-Type': 'multipart/form-data',
//     'Content-Type': 'text/plain'
// };
// for (let key in a) {
//     console.log(a[key])
// }
// console.log(file.size)
// console.log(datas)
// ajax({
//     url: 'http://localhost:8888/api/test1',
//     httpheader: {
//         'Content-Type': 'multipart/form-data',
//         'test': 'this is test header',
//         'accept': 'image/png'
//     },
//     data: datas,
//     success: d => {
//         console.log(d)
//     }

// })
// c.lineWidth = "12";
// c.strokeStyle = "red";
// c.rect(100, 100, 300, 300); //矩形的方法
// c.stroke(); //显示路径图像
// //  c.closePath();
// c.beginPath(); //创建新的图像路径
// c.arc(500, 500, 300, -Math.PI, Math.PI / 2); //绘制圆的方法
// c.stroke();
// c.beginPath();
// c.strokeRect(400, 400, 300, 300);//绘制并显示矩形
// let imgele = document.getElementsByTagName('img')[0]
// imgele.src = URL.createObjectURL(new Blob([datas]))

// c.clearRect(0, 0, 300, 300)
// img.onload = e => {

//     c.drawImage(img, 0, 0, 300, 300);
//     can.toBlob(async d => {

//     })
// }
// console.log(img)
/** */
function* asyncf() {
        let i = 0;
        while (3 > i)
                yield* ++i;

}
// }
// top.test = test;


// const object1 = {};

// Object.defineProperty(object1, 'property1', {

//     set(e) {
//         this.value = e;
//     },
//     get() {
//         return this.value
//     }}
// writable: true
// });
// let a = {};
// let b = a.Blob;
// object1.property1 = 77;
// // throws an error in strict mode
/*
// console.log(object1.property1);
// // expected output: 42
// let b = {};
// !function (a) {
//     a();
// }(a=>{console.log('test')});

let a = Symbol('123');
let b = Symbol('123');
console.log(a == b);
*/


/**
 * 获取并操作Ajax数据
 *@param { { url: string, success: (text:string)=>Promise<void>), failed ?: 
        (text:string)=>void, data ?: string, method ?: 'POST'|'GET'|'DELETE'|'PUT'|'OPTIONS'|'TRACE',
         httpheader ?:{"Content-Type"?:['application/x-www-form-urlencoded'|
         'multipart/form-data'|'text/plain'|
         'audio/mpeg'|'video/mpeg'|'image/pipeg'|
         'image/jpeg'|'image/x-icon']|'application/x-www-form-urlencoded'|
         'multipart/form-data'|'text/plain'|
         'audio/mpeg'|'video/mpeg'|'image/pipeg'|
         'image/jpeg'|'image/x-icon',"Set-Cookie"?:string} } object  options
 */
export async function getAjaxData({
        url,
        success,
        failed = error => {
                console.log(`error of failed data : ${error}`);
        },
        data = '',
        method = 'POST',
        httpheader = { 'Content-Type': 'application/x-www-form-urlencoded' }
}) {
        // open(url,'_blank')
        var ajax = new XMLHttpRequest();
        ajax.open(method, url);
        for (let key in httpheader) {
                if ((typeof httpheader[key]) == 'string')
                        ajax.setRequestHeader(key, httpheader[key]);
                else {
                        try {
                                let values = '';
                                httpheader[key].forEach(value => {
                                        values += value + ';';
                                });
                                values = values.substr(0, values.length - 1);
                                ajax.setRequestHeader(key, values);
                        } catch { console.error('err:isn`t array') }
                }
        }
        ajax.send(data);
        ajax.onreadystatechange = function () {
                console.log('状态码：' + ajax.readyState + '---' + ajax.status)
                if (ajax.readyState == 4) {
                        if (ajax.status == 304) {
                                try {
                                        success(ajax.responseText);
                                } catch (error) {
                                        console.log(`error of success data : ${error}`);
                                }
                        } else
                                if (ajax.status == 200) {
                                        try {
                                                success(ajax.responseText);
                                        } catch (error) {
                                                console.log(`error of success data : ${error}`);
                                        }
                                } else {
                                        failed(ajax.responseText);
                                }
                }
        }
}
let i = window.history.state?.page ?? 1;
window.history.pushState({ page: i }, 'test' + i)
document.getElementById('quit').onclick = function () {
        getAjaxData({
                url: 'http://127.0.0.1:8888/api/loaddata?test=',
                method: 'GET',
                httpheader: { 'Content-Type': 'text/plain' },
                success: d => {

                        let ajax = document.getElementById('ajax');
                        ajax.innerText = d;
                }
        })
}

console.log(
        'https://mail.qq.com/cgi-bin/frame_html?sid=gVye5JuFu6keX24x&r=e95825cf7831bda7fb391f0412e0448d' ==
        'https://mail.qq.com/cgi-bin/frame_html?sid=gVye5JuFu6keX24x&r=e95825cf7831bda7fb391f0412e0448d'
)
document.getElementById('quit').onclick = e => {
        document.getElementsByClassName('progress')[0].style.width = '100%'
        //在渲染器进程 (网页) 中。
        ipcRenderer.send('asynchronous-message', 'newtest.html发送过来的文字');
        let text = document.querySelectorAll('.bg .text');
        let i = 0;
        let time = setInterval(() => {
                text[0].innerHTML = i + '%'
                text[1].innerHTML = i + '%'
                i++;
                if (i > 100)
                        clearInterval(time)
        }, 50);

}