

/**
 * formating datetime
 */
Date.prototype.formatDate = function (fmt: string): string {
    let o: any = {
        "M+": this.getMonth() + 1, //月份           
        "d+": this.getDate(), //日           
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
        "H+": this.getHours(), //小时           
        "m+": this.getMinutes(), //分           
        "s+": this.getSeconds(), //秒           
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
        "f": this.getMilliseconds() //毫秒           
    };
    let week: any = {
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

interface IChatList {

    /**聊天好友列表
     * { name:string,pic:string ...}[ ] 
     * */
    chatPersonsList?: Object[];
    /**消息提示存储 */
    chatNotice?: { name: string, count: number }[];
}

/**
 * 聊天窗口所用数据处理接口
 * 
 */
interface IChat {
    /**
     * 所有聊天记录
     */
    userData?: {
        /** 用户名 */
        username: string,
        /** 登陆时间 */
        logondate: string | number,
    };
    /**我和他所有聊天对话记录♥❤*/
    chatData?: ChatDataSigleList[];



    /**
     * 初始化聊天数据
     */
    initilDataToMemory(): void;
    /**
     * 获取服务器上的所有最新数据
     * @param url http地址获取服务器数据
     */
    getAllNetChatData(url: string): object[];
    /**
     * 聊天数据同步到本地数据库
     */
    syncAllNetToLocal(): void;
    /**
     * 获取本地数据库数据
     */
    getAllLocalChatData(): void;
    /**
     * 获取聊天的单个人对话内容和指定数量(用于加载到内存保存到本地数据库)
     */
    getChatData(name: string, pages: number): object[];

    /**是否存在本地数据 */
    isLocalData?: boolean;

}


/**
 * 对话记录
 * <i>username和userpic为对方信息</i>
 */
class ChatDataSigleList {
    constructor(name: string, pic: string) {
        this.username = name;
        this.userpic = pic;
    }
    pushChatData: Function = (/**他的话 ❤*/peer: ChatData): void => {
        let data = this.chatdata;
        data?.push(peer);
        this.lastSpeak = data?.[data.length - 1];
    }

    /** 用户名 (默认为自己)*/
    username: string;
    /**用户头像 (默认为自己)*/
    userpic: string;

    /**我们在一起的话❤*/
    chatdata?: ChatData[] = [];
    /**我们之间上一次的最后一句 ♥*/
    lastSpeak?: ChatData;
    /**当前是我在说话嘛? */
    isMeSpeakNow?: boolean;

}
/**@deprecated */
let objectTest = {
    thisIsATypescriptTestFrunction(test:string) {
        console.log(test)
    }
};
objectTest.thisIsATypescriptTestFrunction('')
/**
 * 基础聊天数据
 */
class ChatData {
    constructor({ iscurrentuser,
        content,
        date
    }: {
        iscurrentuser: boolean
        content: string,
        date: number | string
    }) {
        this.iscurrentuser = iscurrentuser;
        this.content = content;
        this.date = date;
    }
    /**聊天内容 */
    content: string;
    /**聊天时间 格式yyyyMMdd.HHmmss*/
    date: number | string;
    /**是否是当前登录的账户 */
    iscurrentuser: boolean;
}

class BuildBubblesFrame {
    constructor(bubblesFrame: ChatDataSigleList[], parentEle: HTMLElement) {
        this.updateFrame(bubblesFrame);
        this.chatDataLists = bubblesFrame;
        this.sigleChat = parentEle;
    }
    showFrame = (peername: string) => {
        try {
            this.updateFrame(this.chatDataLists);
        } catch (e) { }
        finally {
            this.sigleChat.innerHTML = '';
            let frame = this.bubblesFrame[peername];
            let data = frame.chatdata;
            let name = frame.username;
            let pic = frame.userpic;
            for (let i: number = 0; i < data.length - 1; i++) {
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
     *  更新指定条目数加载到对象数据
     * @param bubblesFrame load chat data with dealed counts
     */
    updateFrame = (bubblesFrame: ChatDataSigleList[]) => {
        let bubbles: any = {};
        for (let i: number = 0; i < bubblesFrame.length - 1; i++) {
            let name = bubblesFrame[i].username;
            bubbles[name] = bubblesFrame[i];
        }
        this.bubblesFrame = bubbles;
        this.chatDataLists = bubblesFrame;
    }
    sendChatMessage = (name: string, data: string) => {
        try {
            this.bubblesFrame[name].pushChatData(new ChatData({ iscurrentuser: true, content: data, date: new Date().formatDate('yyyyMMdd.HHmmss') }));

            this.sigleChat.innerHTML += `<div class="user-speak">
                                <div class="sending"></div>
                                <div class="user-chat-bubble">${data}</div>
                                <img src="${loginUser.userpic}"
                                    width="30" alt="${loginUser.userpic}">
                            </div>`;
            let dealResult = false;
            //经过一系列处理
            if (dealResult) {
                let resend = this.sigleChat.children[0].children[0];
                resend.innerHTML = '重发';
                resend.className = 'resend';
            } else {
                this.sigleChat.children[0].children[0].remove();
            }
        } catch{ }
    }
    
    sigleBubbleFrame?: HTMLElement;
    /**所有聊天记录,chatDataSigleList[]的{name:chatDataSigleList...} 的转换
     *  @type {{name:ChatDataSigleList[]}...} bubblesFrame s
    */
    bubblesFrame: any;
    chatDataLists: ChatDataSigleList[];
    sigleChat: HTMLElement;

}

var loginUser: { username: string, userpic: string }
/**
 * 单个聊天的所有记录
 */
class Chat implements IChat {
    constructor() {
    }
    initilDataToMemory(): void {
        throw new Error("Method not implemented.");
    }
    getAllNetChatData(url: string): object[] {
        throw new Error("Method not implemented.");
    }
    syncAllNetToLocal(): void {
        throw new Error("Method not implemented.");
    }
    getAllLocalChatData(): void {
        throw new Error("Method not implemented.");
    }
    getChatData(name: string, pages: number): object[] {
        throw new Error("Method not implemented.");
    }
    userData?: {
        /** 用户名 */
        username: string;
        /** 登陆时间 */
        logondate: string | number;
    };

    isLocalData?: boolean;
    chatTitleData = [];
    chatUserList = [];
    chatPic = [];

    getAllChatData(url: string) {
        return [];
    };
}
class Interactive {
    static submitChat: Function;
    static toolEmojiShow: Function;
    static toolImgSelect: Function;
}
console.log(typeof Interactive)