import {
    getQueryString,
    btoaEncrypt,
    buildCookie,
    getTodayDawn,
    getloginedUser
} from '../../myfunc.js'; //相对该文件的相对位置

import {
    IncomingMessage,
    ServerResponse
} from 'http';
import sqlite3modlue from 'sqlite3';
const {
    Database
} = sqlite3modlue;
const utf8 = 'utf-8';
let sqlite3 = new Database('.\\data.db'); //node运行时，启动的文件夹的相对位置

// sqlite3.all(`select username,peername,content,date,isread from chatdata 
//                 where ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?)) ORDER BY DATE ASC LIMIT ?,?`,
//     ['treemoons', 'name', 'name', 'treemoons', 0, 1], (err, row) => {
//         console.log(row)
//         console.log(err)
//     })
/**@type {{name:{request:IncomingMessage,response:ServerResponse,params:string[]}}} */
export let listeningHttp = {}
/**@type {number} */
export let encodingTimes = 10;

/** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
export async function login(http) {
    http.request.on('data', /** @param {string} d */ d => {
        if (d != undefined || d != '') {
            sqlite3.serialize(async () => {
                let username = await getQueryString('username', d.toString(), '&');
                /** @type {{username:string,password:string,isremember:boolean,expire:Date}} */
                sqlite3.get('SELECT COUNT(*) AS Y WHERE USERNAME=? AND PASSWORD=? ',
                    [username, getQueryString('password', d.toString(), '&')],
                    async (err, row) => {
                        if (err != undefined || row.Y != 0) {
                            let key = await btoaEncrypt('token', encodingTimes);
                            let value = await btoaEncrypt(username, encodingTimes);
                            let cookie = buildCookie(key, value, {
                                minutes: 30
                            });
                            http.response.writeHead(200, {
                                'Set-Cookie': `${cookie}`,
                                'Content-Type': 'text/plian;charset=utf-8'
                            });
                            http.response.write("成功：" + d.toString(),);
                        } else {
                            http.response.write('no account available');
                        }
                        http.response.end();
                    })
            })
        } else {
            //  console.log(`data is : ${d}`)
            http.response.end(d)
        }
    })

}

/** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
export async function loaddata(http) {
    let count = 0;
    let username = 'treemoons' //await getloginedUser(http); // 获取登录过后的用户名，使用base64加密，加密次数为encodingTimes；
    if (username) //{
        sqlite3.serialize(() => {
            /**@type {{peername:string,peerpic:string,chatdata:{iscurrentuser:string,content:string,date:number,isread:number}[],lastSpeak:string,isMeSpeakNow:boolean}[]} */
            let chatdatarray = [];
            // sqlite3.get(`SELECT USERPIC FROM USERLOGIN WHERE USERNAME=?;`,
            //     username, (err,/**@type {{date:number|Number,peerpic:string}} */ row) => {
            //         if (err.isNullOrUndefined()) {
            sqlite3.all(`SELECT distinct peername FROM(select peername as peername from CHATDATA where USERNAME=? union select username from chatdata  where peername=?) `,
                [username, username],
                (err, /** @type {{peername:string}[]}*/
                    peers) => {
                    if (peers.length > 0 && !err)
                        peers.forEach(peer => {
                            /**@type {{peername:string,peerpic:string,chatdata:{iscurrentuser:string,content:string,date:number,isread:number}[],lastSpeak:string,isMeSpeakNow:boolean}} */
                            let chatsigledata = {};
                            sqlite3.all(`SELECT username,peername,content,date,isread FROM CHATDATA WHERE (DATE>= 
                                        (SELECT DATE FROM CHATDATA WHERE ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?))
                                         AND ISREAD =0 ORDER BY DATE ASC LIMIT 0,1) OR DATE>=${parseFloat(getTodayDawn().formatDate('yyyyMMdd.HHmmss'))}) 
                                         AND ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?))  ORDER BY DATE ASC`,
                                [username, peer.peername, peer.peername, username, username, peer.peername, peer.peername, username],
                                (err, /** @type {{username:string,peername:string,content:string,date:Number,isread:Number}[]}*/
                                    rows) => {
                                    sqlite3.get(`SELECT USERPIC FROM USERLOGIN WHERE USERNAME=?;`,
                                        peer.peername,
                                        (err, /**@type {{userpic:string}} */ row) => {
                                            if (err == undefined || err == null())
                                                if (row != undefined) {
                                                    chatsigledata.peerpic = row.userpic;
                                                } else
                                                    chatsigledata.peerpic = '';
                                            //set rows by format of chatsigledata[]

                                            chatsigledata.peername = peer.peername;
                                            chatsigledata.chatdata = [];
                                            rows.forEach(sigle => {
                                                /**@type {{iscurrentuser:boolean,content:string,date:number,isread:number}} */
                                                let chatsigle = {
                                                    iscurrentuser: sigle.username == username,
                                                    content: sigle.content,
                                                    date: sigle.date,
                                                    isread: sigle.isread
                                                }
                                                chatsigledata.chatdata.push(chatsigle);
                                            });
                                            count++;
                                            console.log(chatsigledata)
                                            // if (err == null) {
                                            // chatsigledata.lastSpeak = chatsigledata.chatdata[chatsigledata.chatdata.length - 1];

                                            chatdatarray.push(chatsigledata);
                                            if (count === peers.length) {
                                                console.log("最后的i的值：" + count)
                                                console.log('--------------------------------------------------------------------------------------')
                                                http.response.writeHead(200, {
                                                    'Content-Type': 'text/plian;charset=utf-8'
                                                });
                                                http.response.end(JSON.stringify(chatdatarray, (k, v) => v, '    '))
                                            }
                                        }
                                    );
                                });

                        });
                    else {
                        http.response.end()
                    }
                });
        });

}

/** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
export async function gethistory(http) {
    http.request.on('data', d => {
        /**@type {{ peername: string, ignorecount: number , requestcount: number}} */
        let data = JSON.parse(d.toString());
        console.log(data);
        let username = 'treemoons' //await getloginedUser(http); // 获取登录过后的用户名，使用base64加密，加密次数为encodingTimes；
        if (username)
            sqlite3.all(`select username,peername,content,date,isread from chatdata 
                        where ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?)) ORDER BY DATE desc LIMIT ?,?`,
                [username, data.peername, data.peername, username, data.ignorecount, data.requestcount],
                (err, rows) => {
                    if (!err && rows?.length > 0) {
                        /**@type {{iscurrentuser:string,content:string,date:number,isread:number}[]} */
                        let datarows = [];
                        rows.forEach(sigle => {
                            /**@type {{iscurrentuser:string,content:string,date:number,isread:number}} */
                            let chatsigle = {
                                iscurrentuser: sigle.username == username,
                                content: sigle.content,
                                date: sigle.date,
                                isread: sigle.isread
                            }
                            datarows.push(chatsigle);
                        });
                        console.log('--------------------------------------------------------------------------------------')
                        console.log(err)
                        http.response.writeHead(200, {
                            'Content-Type': 'text/plian;charset=utf-8'
                        });
                        http.response.end(JSON.stringify({ data: datarows }, (k, v) => v, '    '))
                    } else {
                        console.log(err)
                        http.response.end()
                    }

                });

    })

}

/** 发送消息
 * @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
export async function chatto(http) {
    http.request.on('data', async d => {
        if (d) {
            /**@type {{  peername: string, content: string, date: number,isread:number  }} */
            let data = JSON.parse(d);
            let msg = {
                status: 0,
                msg: undefined
            };
            let username = 'treemoons'// await getloginedUser(http);
            if (username) {
                insertSql();
            } else {
                http.response.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                http.response.end(JSON.stringify(msg))
            }
            function insertSql() {
                sqlite3.run(`INSERT INTO CHATDATA(USERNAME,PEERNAME,CONTENT,DATE,ISREAD) VALUES(?,?,?,?,0);`,
                    [username, data.peername, data.content,],
                    async err => {
                        if (!err) {
                            msg.msg = err.message;
                        } else {
                            msg.status = 1;
                            //send to logined

                            //检查是否对方登录超时
                            if (listeningHttp[data.peername] && await getloginedUser(listeningHttp[data.peername])) {
                                let chatmessage = JSON.stringify({ peername: name, content: data.content, date: data.date, isread: 0 })
                                listeningHttp[data.peername]?.response.end(chatmessage, utf8, () => {
                                    sentSave(username, data);
                                });
                                listeningHttp[data.peername]?.response.on('error', err => {
                                    listeningHttp[data.peername]?.response.end(chatmessage, utf8, () => {
                                        sentSave(username, data);
                                    });
                                });
                            }
                        }
                        http.response.end(JSON.stringify(msg))
                    });
            }
        }
    });
}

function sentSave(username,data) {
    // listeningHttp[data.peername] = undefined;
    //sent before being saved 
    sqlite3.run(`UPDATE CHATDATA SET ISREAD =1 WHERE USERNAME=? AND PEERNAME=?; AND DATE=?`,
        [username, data.peername, data.date],
        err => { });
}

/** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
export async function listening(http) {
    // listeningHttp[await getloginedUser(http)] = http;
    listeningHttp['treemoons'] = http;
    // listeningHttp['treemoons'].response.setHeader('Content-Type', 'text/plain');
}


/**
 * 主动退出登录需要调用
 */
export async function logout(http) {
    listeningHttp[await getloginedUser(http)] = undefined;
}

export function test(t) {
    {
        listeningHttp['treemoons'].response.end("test----这是我listening的结果");
        t.response.end(JSON.stringify({ name: '1234', numname: 1234444 }));
    }
}

let a = { s: () => { console.log('s') } }
let olds = a.s;
function news() {
    olds()
    console.log('new s')
}
a.s = news;
a.s();