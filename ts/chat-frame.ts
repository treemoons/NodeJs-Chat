// const {
//     readdir
/**
 * 对话记录
 * <i>username和userpic为对方信息</i>
 */
interface ChatDataSigleList {
    /**登录用户名 */
    username:string;
    /**登录头像 */
    userpic:string;
    /**
     * 添加一条记录
     * @param {ChatData} peer 对话记录
     */
    pushChatData : ( /**他的话 ❤*/ peer: string) => void
    /**
     * @param {ChatData} peer 对话记录
     */
    getHistoryChat : (peer: ChatData) =>void

    /** 好友用户名 
     * @type {string}*/
    peername?: string;

    /** 好友头像 
     * @type {string}
     */
    peerpic?: string;

    /**我们在一起的话❤
     * @type {ChatData[]}
     */
    chatdata?: ChatData[] ;

    /**我们之间上一次的最后一句 
     * @type {ChatData} ♥*/
    lastSpeak?: ChatData;

    /**当前是我在说话嘛 
     * @type {boolean}
     */
    isMeSpeakNow?: boolean;
    /**@type {number} */
    unreadCount?: number;
}
/**
 * 基础聊天数据
 */
interface ChatData {

    /**聊天内容 
     */
    content: string;
    /**聊天时间 格式yyyyMMdd.HHmmss
     */
    date: string;
    /**是否是当前登录的账户*/
    iscurrentuser: boolean;
    isread: boolean;
}
/** 创建聊天数据基础与显示client端 */
 interface BuildBubblesFrame {

    /**登录用户名 */
    username: string;
    /**登录头像 */
    userpic: string;
    friendlistEle: any;
    /**所有聊天记录,chatDataSigleList[]转换
     * @type {{name:ChatDataSigleList}} bubblesFrame s*/
    bubblesFrame: any;
    /**@type {ChatDataSigleList[]} */
    chatDataLists: ChatDataSigleList[];
    /**一个好友信息的所有标签元素的父元素
     * @type {any}*/
    sigleChat: any;
    /**
     * @param {string} peername 聊天对象名
     */
    showFrame: (peername: string) => void


    /**
     *  更新指定条目数加载到对象数据(主要是更新新消息)
     * @param {ChatDataSigleList[]} chatDataLists load chat data with dealed counts
     */
    updateFrame: () => void

    /**
     * 主要查看历史消息
     * @param {number} pieces 查询条目个数
     */
    backChatHistory: (pieces: number, name: string) => void

    /**
     * loading initializated data
     */
    initializaingData: () => void

    initializaingfriendlist: () => void
    /**
     * 主动发送消息给对方
     * @param {string} name 聊天对象名称
     * @param {string} data 内容
     */
    sendChatMessage: (name: string, data: string) => void
}

const { Database } = require("sqlite3");
var sqlite3 = new Database('../myNodeTest/controllers/api/data');
let data = { applyuser: 'apply', sendData: { username: 'name', content: "niha", date: 20200910.121822 } }
sqlite3.serialize(() => {
    sqlite3.run(`INSERT INTO CHATDATA(USERNAME,PEERNAME,CONTENT,DATE) 
                                VALUES(?,?,?,?);`,
        [data.applyuser, data.sendData.username, data.sendData.content, data.sendData.date],
        (        err: { message: undefined; } | undefined) => {
            let msg = { status: 0, msg: undefined };
            if (err != undefined)
                msg.msg = err.message;
            else
                msg.status = 1;
            console.log(JSON.stringify(msg));
        });
    sqlite3.all('SELECT * FROM CHATDATA', (err:any, row:any) => {
        console.log(row)
    })
});