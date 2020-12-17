
String.prototype.replaceParameterValue= function ( symbol, value) {
    let reg = new RegExp(`(?<=[^\\\\])\\$\{${symbol}}`, 'g')
    return this.replace(reg, value);
}
readFile('./test/test.json', { encoding: 'utf8' }, (err, d) => {
    let test = 'd:/$RECYCLE.BIN/';
    let symbol= 'name'
   let j= JSON.parse( d.replaceParameterValue(symbol,test).replaceParameterValue('test','./chat-frame.js'))
    console.log(j)
})


const mypack = await import('testpackage');
let count = 0;
async function s() {
    async function re() {
        mypack.default.a('mypackage:' + count++);
        return re;
    }
    return re;
};
let a =await s().then(e => e()).then(w => w()).then(e => e());

a();
async function asyncTest(test) {
    return test;
}
console.log(await asyncTest('s'))
console.log((await import('electron')).BrowserView)

console.log(exports);
console.log(0.1 + 0.2);

let test = `\${}`;
console.log(test)

window.onload = function () {
    var oBox = document.getElementById('box');
    var oM = document.getElementById('m1');
    var timer = null;
    document.ondragover = function (ev) {
        clearTimeout(timer);
        timer = setTimeout(function () {
            oBox.style.display = 'none';
        }, 200);
        oBox.style.display = 'block';
    };
    //进入子集的时候 会触发ondragover 频繁触发 不给ondrop机会
    oBox.ondragenter = function () {
        oBox.innerHTML = '请释放鼠标';
    };
    oBox.ondragover = function () {
        return false;
    };
    oBox.ondragleave = function () {
        oBox.innerHTML = '请将文件拖拽到此区域';
    };
    oBox.ondrop = function (ev) {
        console.log(ev.dataTransfer);
        console.log(ev.dataTransfer.getData())
        var oFile = ev.dataTransfer.files[0];
        console.log('ofile:' + oFile)
        var reader = new FileReader();
        //读取成功
        reader.onload = function () {
            console.log(reader);
        };
        reader.onloadstart = function () {
            console.log('读取开始');
        };
        reader.onloadend = function () {
            console.log('读取结束');
        };
        reader.onabort = function () {
            console.log('中断');
        };
        reader.onerror = function () {
            console.log('读取失败');
        };
        reader.onprogress = function (ev) {
            var scale = ev.loaded / ev.total;
            if (scale >= 0.5) {
                console.log(1);
                reader.abort();
            }
            oM.value = scale * 100;
        };
        reader.readAsText(oFile, 'asiic');
        return false;
    };
};

for (let i = 0; i < 10; i++){
    
    switch (i) {
        case 1:
            console.log('test');
            break;
    
        default:
            console.log(i)
            break;
    } 
    if (i == 6) break;
}   

