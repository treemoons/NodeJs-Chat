

/**
 * formating datetime
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
 */
class ChatDataList {
    /**
     * 
     * @param {{me:ChatData,peer:ChatData}} param0 
     */
    constructor({ me, peer }) {
        if ((me === undefined) && (peer === undefined)) throw ('undefined "me" and "peer."');
        this.me = me;
        this.peer = peer;
        this.isMeSpeakNow = peer === undefined ? true : false;
        if (this.isMeSpeakNow) {
            this.data = me;
            this.data.username = '-----';
        } else {
            this.data = peer;
        }
        console.log("me" )
            console.log( me);
        console.log("data  ")
            console.log(this.data)
        console.log('usename   :'+this.data?.username)
        this.lastSpeak = this.data?.content;
    }
    /**我的话 */
    me;
    /**他的话 ❤*/
    peer;
    /**我们在一起的话❤*/
    data;
    /**我们之间上一次的最后一句 ♥*/
    lastSpeak;
    /**当前是我在说话嘛? */
    isMeSpeakNow;

}
/**
 * 基础聊天数据
 */
class ChatData {
    /**
     * @param {{name:string,userpic:string,content:string,date:string|number}} basicData 
     */
    constructor({
        name,
        userpic,
        content,
        date
    }) {
        this.username = name;
        this.userpic = userpic;
        this.content = content;
        this.date = date;
    }
    /** 用户名 (默认为自己)*/
    username = (() => {
        return ''
    })();
    /**用户头像 (默认为自己)*/
    userpic = (() => {
        return ''
    })();
    /**聊天内容 */
    content;
    /**聊天时间 */
    date;
}
let tets=new ChatDataList({me:new ChatData({content:'nihao',date:20200818})})
/**
 * 单个聊天的所有记录
 */
class Chat  {
    constructor() {
    }
    initilDataToMemory() {
        throw new Error("Method not implemented.");
    }
    getAllNetChatData(url){
        throw new Error("Method not implemented.");
    }
    syncAllNetToLocal() {
        throw new Error("Method not implemented.");
    }
    getAllLocalChatData() {
        throw new Error("Method not implemented.");
    }
    getChatData(name, pages){
        throw new Error("Method not implemented.");
    }
    userData;

    isLocalData;
    chatTitleData = [];
    chatUserList = [];
    chatPic = [];
    chatDataList=[];

    getAllChatData(url) {
        return [];
    };
}