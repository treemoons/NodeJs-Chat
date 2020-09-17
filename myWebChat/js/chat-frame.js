const {
    readdir
} = require("fs");

readdir('F:/100套笔刷/100', (e, filelist) => {
    let list;
    // console.log(filelist)
    // console.log(e)
    for (let i = 0; i < filelist.length; i++) {
        list += filelist[i] + "\n";
    }
    let reg = /.+\.abr/g;
    let ma = list.match(reg);
    console.log(ma)
    for (let i = 0; i < ma.length; i++) {
        // console.log(ma[i]+"\n")
    }
})



/**
 * 获取并操作Ajax数据
 *@param { { url: string, success: (text:string)=>Promise<void>), failed ?: 
        (text:string)=>void, data ?: string, method ?: string, httptype ?:string } object  options
 */
function getAjaxData({
    url,
    success,
    failed = error => {
        console.log(`error of failed data : ${error}`);
    },
    data = '',
    method = 'POST',
    httptype = 'application/x-www-form-urlencoded'
}) {
    debugger;
    // open(url,'_blank')
    var ajax = new XMLHttpRequest();
    ajax.open(method, url);
    ajax.setRequestHeader('Content-Type', httptype);
    ajax.send(data);
    ajax.onreadystatechange = async function () {
        if (ajax.readyState == 4) {
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

/**
 * @param {string} fmt 
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

/**
 * 对话记录
 * <i>username和userpic为对方信息</i>
 */
class ChatDataSigleList {
    /**
     * @param {string} name 对方姓名
     * @param {string} pic 对方头像
     */
    constructor(name, pic, data) {
        this.username = name;
        this.userpic = pic;
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
        this.lastSpeak = data[data.length - 1];
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
    /**@type {number} */
    unreadCount;
}
/*@deprecated */
let objectTest = {

    /** @deprecated  */
    thisIsATypescriptTestFrunction() {
        console.log('test')
    }
};
objectTest.thisIsATypescriptTestFrunction()
/**
 * 基础聊天数据
 */
class ChatData {
    /**
     * 
     * @param {{iscurrentuser:boolean,content:string,date:string|number}}  
     */
    constructor({
        iscurrentuser,
        content,
        date
    }) {
        this.iscurrentuser = iscurrentuser;
        this.content = content;
        this.date = date;
    }

    /**聊天内容 
     * @type {string}
     */
    content;
    /**聊天时间 格式yyyyMMdd.HHmmss
     * @type {string|number}
     */
    date;
    /**是否是当前登录的账户
     *  @type {boolean}*/
    iscurrentuser;
    /**@type {boolean} */
    isread;
}
/** 创建聊天数据基础与显示client端 */
class BuildBubblesFrame {

    /**
     * 前提是已经登陆用户名
     * @param {HTMLElement} parentEle 
     */

    constructor(user, pic, parentEle) {
        user = this.username;
        pic = this.userpic;
        this.sigleChat = parentEle;
        this.loadMessage();
    }
    /**登录用户名 */
    username = '';
    /**登录头像 */
    userpic = '';

    sigleBubbleFrame;
    /**所有聊天记录,chatDataSigleList[]转换
     * @type {{name:ChatDataSigleList}} bubblesFrame s*/
    bubblesFrame;
    /**@type {ChatDataSigleList[]} */
    chatDataLists;
    /**一个好友信息的所有标签元素的父元素
     * @type {HTMLElement}*/
    sigleChat;
    /**
     * @param {string} peername 聊天对象名
     */
    showFrame = (peername) => {
        try {
            this.updateFrame(this.chatDataLists);
        } catch (e) {
            console.log(e);
        } finally {
            //清空
            this.sigleChat.innerHTML = '';
            /**
             * @type {ChatDataSigleList}
             */
            let frame = this.bubblesFrame[peername];
            let data = frame.chatdata;
            for (let i = 0; i < data.length - 1; i++) {

                let name = data[i].iscurrentuser ? this.username : frame.peername;
                let pic = data[i].iscurrentuser ? this.userpic : frame.peerpic;
                if (new Date().formatDate('yyyyMMdd.HHmmss') > data[i].date + 1) {
                    //昨天
                } else if (new Date().formatDate('yyyyMMdd.HHmmss') > data[i].date) {
                    //今天
                } else {
                    //历史
                }
                if (data.iscurrentuser) {
                    this.sigleChat.innerHTML += `<div class="user-speak">
                                <div class="user-chat-bubble">${data[i].content}</div>
                                <img src="${pic}"
                                    width="30" alt="${name}">
                            </div>`;
                } else {
                    this.sigleChat.innerHTML += `<div class="peer-speak">
                                <img src="${pic}"
                                    width="30" alt="${name}">
                                <div class="user-chat-bubble">${data[i].content}</div>
                                <div class="resend">重发</div>
                            </div>`;
                }
            }
        }
    }


    /**
     *  更新指定条目数加载到对象数据(主要是更新新消息)
     * @param {ChatDataSigleList[]} chatDataLists load chat data with dealed counts
     */
    updateFrame = async () => {
        let bubbles = {};
        for (let i = 0; i < this.chatDataLists.length - 1; i++) {
            let name = this.chatDataLists[i].peername;
            bubbles[name] = this.chatDataLists[i];
        }
        this.bubblesFrame = bubbles;
    }
    /**
     * 主要查看历史消息
     * @param {number} pieces 查询条目个数
     */
    backChatHistory(pieces, name) {
        //ajax to server get
        //suppose got it into variable history

        /**
         * @type {ChatDataSigleList} 
         */
        let history;
        for (let i = history.chatdata.length - 1; i >= 0; i--) {
            this.bubblesFrame[name].getHistoryChat(history.chatdata[i])
        }

    }

    loadMessage = async () => {
        getAjaxData({
            url: '/api/loaddata',
            success: async d => {
                /**@type {{peername:string,peerpic:string,chatdata:{iscurrentuser:string,content:string,date:string,isread:number}[]}[]} */
                let data = JSON.parse(d)
                // 获取并转化为chatsiglelist[];
                let recChatDataLists = data;

                recChatDataLists.forEach(async (value, i, Lists) => {
                    this.chatDataLists[i] = new ChatDataSigleList(value.peername, value.peerpic, value.chatdata)
                    let lastSpeak = value.chatdata[value.chatdata.length - 1];
                    this.chatDataLists[i].lastSpeak = lastSpeak;
                    this.chatDataLists[i].isMeSpeakNow = lastSpeak.iscurrentuser;
                    let unreadcount = 0;
                    value.chatdata.forEach(v => {
                        if (v.isread = 0)
                            unreadcount++;
                    });
                    this.chatDataLists[i].unreadCount = unreadcount;
                });
                await this.updateFrame(this.chatDataLists);
                // 调整提示气泡


            }
        })
    }
    /**
     * 主动发送消息给对方
     * @param {string} name 聊天对象名称
     * @param {string} data 内容
     */
    sendChatMessage = (name, data) => {
        try {
            this.bubblesFrame[name].pushChatData(new ChatData({
                iscurrentuser: true,
                content: data,
                date: new Date().formatDate('yyyyMMdd.HHmmss')
            }));

            this.sigleChat.innerHTML += `<div class="user-speak">
                                <div class="sending"></div>
                                <div class="user-chat-bubble">${data}</div>
                                <img src="${loginUser.userpic}"
                                    width="30" alt="${loginUser.userpic}">
                            </div>`;
            let resend = this.sigleChat.children[0].children[0];
            let chatdata = {
                applyuser: 'username',
                sentdata: {
                    peername: name, content: data, date: new Date().formatDate('yyyyMMdd.HHmmss')
                }
            };
            //经过一系列处理存到服务器
            getAjaxData({
                url: '/api/chat',
                data: JSON.stringify(chatdata),
                success: d => {
                    /**@type {{ status: number, msg: undefined }} */
                    let msg = JSON.parse(d)
                    if (msg.status == 0) {
                        resend.innerHTML = '重发';
                        resend.className = 'resend';
                    } else {
                        this.sigleChat.children[0].children[0].remove();
                    }
                },
                failed: err => {
                    alert(err);
                    resend.innerHTML = '重发';
                    resend.className = 'resend';
                }
            })
        } catch { }
    }

}

var loginUser;
class Interactive {
    static submitChat;
    static toolEmojiShow;
    static toolImgSelect;
}

let a = {
    a: "ee",
    bb: { sha: "sha" }
}
class b {
    constructor() {

    }
    a = 'ee'
}
!function (p, aa) {
    console.log(p.a)
    console.log(aa.a)
}(new b(), a);
