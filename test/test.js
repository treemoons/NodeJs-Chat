// import { read, readFile } from 'fs';
// readFile('.\\test/test.json',(err, d) => {
//         if (err) {
//                 console.log(err)
//                 return;
//         }
//         let str = d.toString();
//         console.log(str.length)
//         let jsonstr = str.replace(/\/\*[^\*]*\*+([^\/*][^*]*\*+)*\//g, '');
//         // console.log(jsonstr)
//         jsonstr = jsonstr.replace(/(?<!http(:|s:)|ws:|file:\/)\/\/.*(?:\n|\s*)/g, '')
        
//         console.log(JSON.parse(jsonstr))
// })

// console.log('test.mjs module');
// export default function () {
//         console.log('test')

// }

const { ipcRenderer } = require('electron')

document.getElementById('quit').onclick = e => {
        //在渲染器进程 (网页) 中。
        ipcRenderer.on('/asynchronous/reply', (event, arg) => {
                console.log(arg) // prints "pong"
        })
        ipcRenderer.send('asynchronous-message', 'newtest.html发送过来的文字')
}

console.log(" %ct %cest", "color:red", "color:blue")
console.log('\x1b[36m%s', 'I am cyan');  //cyan

console.log('test')
console.log('\x1b[43m%s\x1b[0m', "stringToMakeYellow");  //yellow
console.log("\x1b[35;3;1m%s #eab10e", "test");

/**
 * /*
 * @param {string} str 
 */
function removeComment(str) {
        let reg = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g
        let a = `/**//**
 * 每   一个input的file都对应files是多个文件，必须使用files[0]来设置和获取单个文件属性
 * 可以在标签中使用multiple多选
 *  accept="image/jpeg,image/png,image/gif" 类型
 * @type {HTMLInputElement} 
 */
// let pic = fileform.filepic;
/*
 * 对话记录
 * <i>username和userpic为对方信息</i>
 ***/
class ChatDataSigleList {
    /**  /**  * /
     * @param {string} name 对方姓名
     * @param {string} pic 对方头像
     * @param {ChatData} data 对方头像
    * */
    constructor(name, pic, data) {
        this.peername = name;
        this.peerpic = pic;
        this.chatdata = data;
    }
    /**
     * 添加一条记录
     * @param {ChatData} peer 对话记录
     */
    pushChatData = ( /**他的话 ❤*/ peer) => {
        let data = this.chatdata;
        data.push(peer);
        this.lastSpeak = data[data.length - 1];
    }
    /**
     * @param {ChatData} peer 对话记录
     */
    getHistoryChat = (peer) => {
        let data = this.chatdata;
        data.unshift(peer);
    }

    /** 好友用户名 
     * @type {string}*/
    peername;

    /** 好友头像 
     * @type {string}
     */
    peerpic;

    /**我们在一起的话❤
     * @type {ChatData[]}
     */
    chatdata = [];

    /**我们之间上一次的最后一句 
     * @type {ChatData} ♥*/
    lastSpeak;

    /**当前是我在说话嘛 
     * @type {boolean}
     */
    isMeSpeakNow;
    /* @type {number} */
    unreadCount = 0;
}
`
        console.log(a.match(reg))
        console.log(a.match(/\/\*([^\*]|(\*)*[^\*/])*(\*)*\*(?:\/)/g));
        for (let i = 0; i < 4; i++) {
                console.log(a.match(reg)[i] == a.match(/\/\*([^\*]|(\*)*[^\*/])*(\*)*\*(?:\/)/g)[i])
        }


}
/**  /**
 * /
 * @param {string} convertString 
 */
function convertCurrency(convertString) {
        // Constants: 
        // let MAXIMUM_NUMBER = 99999999999.99;
        // Predefine the radix characters and currency symbols for output: 
        let CN_ZERO = "零";
        let CN_ONE = "壹";
        let CN_TWO = "贰";
        let CN_THREE = "叁";
        let CN_FOUR = "肆";
        let CN_FIVE = "伍";
        let CN_SIX = "陆";
        let CN_SEVEN = "柒";
        let CN_EIGHT = "捌";
        let CN_NINE = "玖";
        let CN_TEN = "拾";
        let CN_HUNDRED = "佰";
        let CN_THOUSAND = "仟";
        let CN_TEN_THOUSAND = "万"; //with thousand and huandred  
        let CN_HUNDRED_MILLION = "亿"; //with thousand and huandred  
        let CN_SYMBOL = "";
        let CN_DOLLAR = "元";
        let CN_TEN_CENT = "角";
        let CN_CENT = "分";
        let CN_INTEGER = "整";
        if (!(convertString).match(/^[1-9]\d+(?:\d+|\.\d{1,2})|^0\.\d{1,2}$/)) {
                console.error("请输入正确的数字金额!");
                return "";
        }


        console.log(convertString.match(/^[1-9]\d+(?:\d+|\.\d{1,2})|^0\.\d{1,2}$/))
        let inputNumberArray = convertString.split('.');
        let resultInt = '', resultFloat = '';
        //deal with part of float
        console.log(inputNumberArray[1])
        if (inputNumberArray.length > 1 && inputNumberArray[1] != '00') {
                if (inputNumberArray[1][0] !== '0') {
                        resultFloat += inputNumberArray[1][0] + CN_TEN_CENT;
                }
                else if (inputNumberArray[0] !== '0') { // part of int is not zero
                        resultFloat += inputNumberArray[1][0].replace(/0/, CN_ZERO) + CN_TEN_CENT;
                }
                if (inputNumberArray[1][1] !== '0') {
                        resultFloat += inputNumberArray[1][1] + CN_CENT;
                }
                resultFloat = resultFloat
                        .replace(/1/g, CN_ONE)
                        .replace(/2/g, CN_TWO)
                        .replace(/3/g, CN_THREE)
                        .replace(/4/g, CN_FOUR)
                        .replace(/5/g, CN_FIVE)
                        .replace(/6/g, CN_SIX)
                        .replace(/7/g, CN_SEVEN)
                        .replace(/8/g, CN_EIGHT)
                        .replace(/9/g, CN_NINE);
        }
        //deal with part of int
        if (inputNumberArray[0] !== '0') {
                let tempIntSort = inputNumberArray[0].match(/\d/g).reverse();
                console.log(tempIntSort)
                let loopCount = 0;
                for (let i = 0; i < tempIntSort.length; i++) {
                        if (i % 4 == 0 && i != 0) {
                                loopCount++;
                                switch (loopCount % 2) {
                                        case 0:
                                                if (tempIntSort[i] == 0)
                                                        tempIntSort[i] = CN_HUNDRED_MILLION;
                                                else
                                                        tempIntSort[i] += CN_HUNDRED_MILLION;
                                                break;
                                        case 1:
                                                if (tempIntSort[i] == 0)
                                                        tempIntSort[i] = CN_TEN_THOUSAND;
                                                else
                                                        tempIntSort[i] += CN_TEN_THOUSAND;
                                                break;
                                }
                        } else {
                                if (tempIntSort[i] == '0') {
                                        continue;
                                }
                                switch (i % 4) {
                                        case 1:
                                                tempIntSort[i] += CN_TEN;
                                                break;
                                        case 2:
                                                tempIntSort[i] += CN_HUNDRED;
                                                break;
                                        case 3:
                                                tempIntSort[i] += CN_THOUSAND;
                                                break;
                                }
                        }
                }
                tempResult = '';
                for (let i = tempIntSort.length - 1; i >= 0; i--) {
                        tempResult += tempIntSort[i];
                }
                resultInt = tempResult.replace(/1/g, CN_ONE)
                        .replace(/2/g, CN_TWO)
                        .replace(/3/g, CN_THREE)
                        .replace(/4/g, CN_FOUR)
                        .replace(/5/g, CN_FIVE)
                        .replace(/6/g, CN_SIX)
                        .replace(/7/g, CN_SEVEN)
                        .replace(/8/g, CN_EIGHT)
                        .replace(/9/g, CN_NINE)
                        .replace(/000万000/g, CN_SYMBOL)
                        .replace(/000万/g, '0')
                        .replace(/0{0,2}(?:万)/g, CN_TEN_THOUSAND)
                        .replace(/0{0,3}(?:亿)/g, CN_HUNDRED_MILLION)
                        .replace(/0+/g, CN_ZERO) + CN_DOLLAR;
                resultInt = resultInt.replace(/零元/, CN_DOLLAR)
        } else
                resultInt = '';
        console.log(resultInt);
        return resultInt == ''
                ? resultFloat
                : (resultFloat == '' ? resultInt + CN_INTEGER : resultInt + resultFloat);

}
console.log(convertCurrency('100000000000.00'));
export default {
        
}
export function testclo() {
                console.log('test')
        }