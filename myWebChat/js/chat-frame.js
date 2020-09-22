// const {
//     readdir
// } = require("fs");

// readdir('F:/100套笔刷/100', (e, filelist) => {
//     let list;
//     // console.log(filelist)
//     // console.log(e)
//     for (let i = 0; i < filelist.length; i++) {
//         list += filelist[i] + "\n";
//     }
//     let reg = /.+\.abr/g;
//     let ma = list.match(reg);
//     console.log(ma)
//     for (let i = 0; i < ma.length; i++) {
//         // console.log(ma[i]+"\n")
//     }
// })

export function getfriendid(friendEle) {
    return friendEle.getAttribute('data-name');
}

export let chatwindow = document.querySelector('.chat-data-frame .chat-data');
HTMLElement.prototype.scrolltoRelativePosition = function (aimPositionElement) {
    this.scrollTo(aimPositionElement.offsetLeft, aimPositionElement.offsetTop)
}

/**
 * 获取并操作Ajax数据
 *@param { { url: string, success: (text:string)=>Promise<void>), failed ?: 
        (text:string)=>void, data ?: string, method ?: string, httptype ?:string } object  options
 */
export function getAjaxData({
    url,
    success,
    failed = error => {
        console.log(`error of failed data : ${error}`);
    },
    data = '',
    method = 'POST',
    httptype = 'application/x-www-form-urlencoded'
}) {
    // open(url,'_blank')
    var ajax = new XMLHttpRequest();
    ajax.open(method, url);
    ajax.setRequestHeader('Content-Type', httptype);
    ajax.send(data);
    ajax.onreadystatechange = function () {
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
 * 将指定的“yyyyMMdd.HHmmss”格式的时间转换成时间对象
 * @param {string} formated 
 */
export function formatBackDate(formated) {
    let dateString = formated.replace('.');
    let year = dateString.substr(0, 4);
    let month = dateString.substr(4, 2);
    let day = dateString.substr(6, 2);
    let hour = dateString.substr(8, 2);
    let minute = dateString.substr(10, 2);
    let second = dateString.substr(12, 2);
    let millisecond = dateString.substr(14);
    return new Date(year, month, day, hour, minute, second, millisecond);
}

/**
 * 对话记录
 * <i>username和userpic为对方信息</i>
 */
class ChatDataSigleList {
    /**
     * @param {string} name 对方姓名
     * @param {string} pic 对方头像
     * @param {ChatData} data 对方头像
     */
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
    /**@type {number} */
    unreadCount = 0;
}


/**@deprecated */
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
     * @param {{iscurrentuser:boolean,content:string,date:string,isread:number}}  
     */
    constructor({
        iscurrentuser,
        content,
        date,
        isread = 0
    }) {
        this.iscurrentuser = iscurrentuser;
        this.content = content;
        this.date = date;
        this.isread = isread
    }

    /**聊天内容 
     * @type {string}
     */
    content;
    /**聊天时间 格式yyyyMMdd.HHmmss
     * @type {string}
     */
    date;
    /**是否是当前登录的账户
     *  @type {boolean}*/
    iscurrentuser;
    /**@type {boolean} */
    isread;
    /**@type {boolean} */
    sendfailed;
}
/** 创建聊天数据基础与显示client端 */
export default class BuildBubblesFrame {

    /**
     * 前提是已经登陆用户名
     * @param {string} user 用户名
     * @param {string} pic 用户头像
     * @param {HTMLElement} parentEle 信息展示窗口的元素
     */
    constructor(user, pic, parentEle = chatwindow, listEle = undefined) {
        this.username = user;
        this.userpic = pic;
        this.sigleChat = parentEle;
        this.friendlistEle = listEle
        this.initializaingData();
    }
    /**登录用户名 */
    username = '';
    /**登录头像 */
    userpic = '';
    /**@type {HTMLElement} */
    friendlistEle;

    sigleBubbleFrame;
    /**所有聊天记录,chatDataSigleList[]转换
     * @type {{name:ChatDataSigleList}} bubblesFrame s*/
    bubblesFrame;
    /**@type {ChatDataSigleList[]} */
    chatDataLists = [];
    /**一个好友信息的所有标签元素的父元素
     * @type {HTMLElement}*/
    sigleChat;
    /**
     * @param {string} peername 聊天对象名
     * @param {Boolean} isopentransition 启用动画
     */
    showFrame = (peername, isopentransition) => {
        try {
            //清空
            this.sigleChat.innerHTML = '';
            /**
             * @type {ChatDataSigleList}
             */

            debugger
            let frame = this.bubblesFrame[peername];
            if (frame) {
                let data = frame.chatdata;
                let datespan = 30;
                let todaydawn = parseFloat(getTodayDawn().formatDate('yyyyMMdd.HHmmss'));
                let dateTemp = todaydawn - 1;
                /**用于比较时间差来提示消息记录 */
                let timetip = '';

                function isShowDate(nowdate, datetip) {
                    if (nowdate - dateTemp > datespan) {
                        timetip = datetip;
                    }
                }
                data.forEach(v => {
                    let name = v.iscurrentuser ? this.username : peername;
                    let pic = v.iscurrentuser ? this.userpic : frame.peerpic;
                    let date = formatBackDate(v.date.toString())
                    if (todaydawn > v.date && todaydawn - 1 < v.date) {
                        //昨天
                        isShowDate(v.date, date.formatDate('昨天 HH:mm:ss'))
                    } else if (todaydawn < v.date) {
                        isShowDate(v.date, date.formatDate('HH:mm:ss'))
                        //今天
                    } else {
                        //历史
                        isShowDate(v.date, date.formatDate('yyyy年MM月dd日 HH:mm:ss'))
                    }
                    dateTemp = v.date;
                    v.isread = 1;
                    this.addpieceschat(v, name, pic, true, isopentransition)
                });
                chatwindow.scrolltoRelativePosition(chatwindow.children[chatwindow.children.length - 1]);
            }
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * 
     * @param {ChatData} piecesdata 聊天信息
     * @param {string} name 用户名
     * @param {string} pic 用户头像
     * @param {boolean} asc 升降添加
     * @param {boolean} isopentransition 开启动画
     */
    addpieceschat = (piecesdata, name, pic, asc, isopentransition) => {
        let piecesChat = document.createElement('div');
        if (piecesdata.iscurrentuser) {
            piecesChat.className = 'user-speak';
            piecesChat.innerHTML += `
                                ${(piecesdata.sendfailed ? '<div class="resend">重发</div>' : '')}
                                <div class="user-chat-bubble">${piecesdata.content}</div>
                                <img src="${pic}"
                                    width="30" height="30" alt="${name}">`;
        } else {
            piecesChat.className = 'peer-speak'
            piecesChat.innerHTML += `
                                <img src="${pic}"
                                    width="30" height="30" alt="${name}">
                                <div class="user-chat-bubble">${piecesdata.content}</div>`;
        }
        if (asc)
            this.sigleChat?.appendChild(piecesChat);
        else
            this.sigleChat?.prepend(piecesChat);
        if (isopentransition)
            setTimeout(() => {
                piecesChat.style.opacity = 1;
            }, 500);
    }

    /**
     *  更新指定条目数加载到对象数据(主要是更新新消息)
     * @param {ChatDataSigleList[]} chatDataLists load chat data with dealed counts
     */
    updateFrame = () => {
        let bubbles = {};
        this.chatDataLists.forEach(v => {
            let name = v.peername;
            bubbles[name] = v;
        });
        this.bubblesFrame = bubbles;
    }

    /**
     * 主要查看历史消息
     * @param {string} name
     * @param {number} pieces 查询条目个数
     * @param {HTMLElement} tip
     */
    backChatHistory(name, pieces, tip) {
        //ajax to server get
        //suppose got it into variable history
        getAjaxData({
            url: 'http://localhost:8888/api/gethistory',
            data: JSON.stringify({ peername: name, requestcount: pieces, ignorecount: (this.bubblesFrame[name]?.chatdata?.length ? this.bubblesFrame[name].chatdata.length : 0) }),
            success: d => {
                if (d) {
                    /**
                     * @type {{iscurrentuser:string,content:string,date:string,isread:number}[]}}
                     */
                    let history = JSON.parse(d).data;
                    /**@type {ChatDataSigleList} */
                    let peerdata = this.bubblesFrame[name];
                    history.forEach(data => {
                        peerdata.getHistoryChat(data);
                        this.addpieceschat(data, name, peerdata.peerpic, false);
                    });
                    chatwindow.scrolltoRelativePosition(tip);
                }
                tip.remove();
            },
            failed: err => {
                tip.innerText = err;
                setTimeout(() => {
                    tip.remove();
                }, 1000);
            }
        })

    }

    /**
     * loading initializated data
     */
    initializaingData = () => {
        getAjaxData({
            url: 'http://localhost:8888/api/loaddata',
            // data: '...',
            success: d => {
                if (d) {
                    this.translatedataFormat(d);
                    serialload(this.chatDataLists);
                    this.updateFrame(this.chatDataLists);
                    this.initializaingfriendlist();
                    this.setonclickanimotion();
                    // 调整提示气泡
                }
                else {
                    //没有任何消息记录和好友
                }
            },
            failed: err => {
                console.log(err)
            }
        })
    }
    translatedataFormat = d => {
        /**@type {{peername:string,peerpic:string,chatdata:{iscurrentuser:boolean,content:string,date:string,isread:number}[]}[]} */
        let data = JSON.parse(d)
        // 获取并转化为chatsiglelist[]|chatsiglelist;
        let recChatDataLists = data;
        recChatDataLists.forEach((value, i, Lists) => {
            this.chatDataLists[i] = new ChatDataSigleList(value.peername, value.peerpic, value.chatdata)
            let lastSpeak = value.chatdata[value.chatdata.length - 1];
            this.chatDataLists[i].lastSpeak = lastSpeak;
            this.chatDataLists[i].isMeSpeakNow = lastSpeak.iscurrentuser;
            let unreadcount = 0;
            value.chatdata.forEach(v => {
                if (v.isread == 0)
                    unreadcount++;
            });
            this.chatDataLists[i].unreadCount = unreadcount;
        });
    }

    /** 由于ajax异步加载，所以在调用处申明，方便引用 */
    setonclickanimotion;
    /**初始化好友列表 */
    initializaingfriendlist = () => {
        this.friendlistEle.innerHTML = '';
        for (let name in this.bubblesFrame) {
            this.friendlistEle.innerHTML += `<li class="friends-list" data-name="${name}">
             ${(this.bubblesFrame[name].unreadCount == 0 ? '' : `<span class="unread-tip">${this.bubblesFrame[name].unreadCount}</span>`)}
            <img src="${(this.bubblesFrame[name]?.peerpic ? this.bubblesFrame[name].peerpic : "")}"  width="30" height="30" alt="">${name}</li>`;
        }
    }
    listening = getAjaxData({
        url: 'http://localhost:8888/api/listening',
        success: d => {
            if (d) {
                //deal with new pieces of data of chat
                /**@type {{peername: string,content: string, date:number,isread: 0 }} */
                let data = JSON.stringify(d);
                this.bubblesFrame[name].chatdata.push({ iscurrentuser: false, content: data.content, date: data.date, isread: data.isread });
                this.serialload(this.chatDataLists);
                this.bubblesFrame[name].unreadCount++;
                this.initializaingfriendlist();
                //go on listening
            }
            this.listening();
        }
    })
    /**
     * 主动发送消息给对方
     * @param {string} name 聊天对象名称
     * @param {string} data 内容
     * @param {boolean} isopentransition 开启动画
     */
    sendChatMessage = async (friendfocus, data, isopentransition) => {
        try {
            let name = getfriendid(friendfocus);
            let date = parseFloat(new Date().formatDate('yyyyMMdd.HHmmss'))
            this.bubblesFrame[name].pushChatData(new ChatData({
                iscurrentuser: true,
                content: data,
                date: date
            }));
            let piecesChat = document.createElement('div');
            piecesChat.className = 'user-speak';
            piecesChat.innerHTML += `
                                <div class="sending"></div>
                                <div class="user-chat-bubble">${data.replace('\n', '<br>')}</div>
                                <img src="${this.userpic}"
                                    width="30" alt="${this.username}">`;
            this.sigleChat.append(piecesChat);
            chatwindow.scrolltoRelativePosition(piecesChat);
            let resend = this.sigleChat?.children[this.sigleChat.children.length - 1]?.children[0];
            let chatdata = {
                peername: name,
                content: data,
                date: date

            };
            if (isopentransition)
                piecesChat.style.opacity = 1;
            this.friendlistEle.prepend(friendfocus)
            //经过一系列处理存到服务器
            getAjaxData({
                url: 'http://localhost:8888/api/chato',
                data: JSON.stringify(chatdata),
                success: d => {
                    /**@type {{ status: number, msg: undefined }} */
                    let msg;
                    if (d)
                        msg = JSON.parse(d)
                    if ((msg?.status && msg?.status == 0) || !msg?.status) {
                        resend.innerHTML = '重发';
                        resend.className = 'resend';
                        this.bubblesFrame.name.chatdata[this.bubblesFrame.name.chatdata.length - 1].sendfailed = true;
                    } else {
                        this.sigleChat?.children[this.sigleChat.children.length - 1]?.children[0]?.remove();
                    }
                },
                failed: err => {
                    resend.innerHTML = '重发';
                    resend.className = 'resend';
                    this.bubblesFrame.name.chatdata[this.bubblesFrame.name.chatdata.length - 1].sendfailed = true;
                }
            })
        } catch { }
    }
    /**
     *  serial the last chat to top one
     * @param {ChatDataSigleList[]} array 
     */
    serialload = array => {

        // debugger;
        var arr = [];//定义一个数组对象
        //遍历赋值
        for (let i = 0; i < array.length; i++) {
            arr.push({
                key: array[i].chatdata[array[i].chatdata.length - 1].date,
                val: array[i]
            })
        }
        //排序对象
        serial(arr);
        //冒泡排序方法排列数组对象
        function serial(arrs) {
            for (let j = 0; j < arr.length - 1; j++) {
                for (let k = 0; k < arr.length - j - 1; k++) {
                    var temp = arrs[k];
                    if (arrs[k].key > arrs[k + 1].key) {//比较相邻的值，>为从小到大，<从大到小；
                        arrs[k] = arrs[k + 1];
                        arrs[k + 1] = temp;
                    }
                }
            }
        }
        for (let i = 0; i < arr.length; i++) {
            array[i] = arr[i].val;
        }
    }
}