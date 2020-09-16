import {
    getQueryString,
    btoaEncrypt,
    buildCookie,
    __dirname,
    getTodayDawn,
    atobDecrypt
} from '../../myfunc.js'; //相对该文件的相对位置
import {
    IncomingMessage,
    ServerResponse
} from 'http';
import sqlite3modlue from 'sqlite3';
const {
    Database
} = sqlite3modlue;
let sqlite3 = new Database('.\\data.db'); //node运行时，启动的文件夹的相对位置
sqlite3.all(`SELECT content,date,isread FROM CHATDATA WHERE DATE>= (SELECT DATE FROM CHATDATA WHERE ? AND ISREAD =0 ORDER BY DATE ASC LIMIT 0,1) AND USERNAME=? AND PEERNAME=?  ORDER BY DATE ASC`,
    [`USERNAME ='treemoons' AND PEERNAME='name'`, 'treemoons', 'name'], (err, row) => {
        console.log(row)
    })
/**@type {number} */
export let encodingTimes = 10;
export default {
    default: http => {
        try {
            console.log(a.p)
        } catch (e) {
            console.log("-------------------" + e)
        }
    },
    'chatto':
        /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        http => {
            http.request.on('data', async d => {
                console.log(__dirname)
                if (d == undefined || d === null) {
                    console.log("d is" + d)
                } else {
                    /**@type {{ applyuser: string, sentdata: { username: string, content: string, date: string|number,isread:number } }} */
                    let data = JSON.parse(d);
                    let msg = {
                        status: 0,
                        msg: undefined
                    };
                    let cookies = await getCookieObject(http);
                    if (cookies != undefined) {
                        insertSql();
                    } else {
                        http.response.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        http.response.write(JSON.stringify(msg))
                        http.response.end()
                    }
                    function insertSql() {
                        sqlite3.run(`INSERT INTO CHATDATA(USERNAME,PEERNAME,CONTENT,DATE,ISREAD) VALUES(?,?,?,?,?);`,
                            [data.applyuser, data.sentdata.username, data.sentdata.content, data.sentdata.date, data.sentdata.isread],
                            err => {
                                console.log(err)
                                if (err.isNullOrUndefined()) {
                                    msg.msg = err.message;
                                } else {
                                    msg.status = 1;
                                    sqlite3.get('SELECT * FROM CHATDATA', (err, rows) => {
                                        console.log(rows);
                                        msg.msg = rows;
                                    });
                                }
                                http.response.end(JSON.stringify(msg))
                            });
                    }
                }
            });
        },
    'login':
        /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        async http => {
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
                                    let cookie = buildCookie(key, value, { minutes: 30 });
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
        },
    /**加载所有的聊天记录，截止到未读或今天凌晨 */
    'loaddata':
        /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        http => {
            // if (isLogined()) {
            sqlite3.serialize(() => {
                let username = 'treemoons' //await getloginedUser(http);
                sqlite3.get(`SELECT USERPIC FROM USERLOGIN WHERE USERNAME=?;`,
                    username, (err,/**@type {{date:string|Number,userpic:string}} */ row) => {
                        if (err == undefined || err == null) {
                            sqlite3.all(`SELECT distinct peername FROM(select peername as peername from CHATDATA where USERNAME=? union select username from chatdata  where peername=?) `,
                                [username, username],
                                (err,/** @type {{peername:string}[]}*/
                                    peers) => {
                                    /**@type {{peername:string,userpic:string,chatdata:{iscurrentuser:string,content:string,date:string}[],lastSpeak:string,isMeSpeakNow:boolean}[]} */
                                    let chatdatarray = [];
                                    peers.forEach((peer, i, peersArray) => {
                                        sqlite3.all(`SELECT username,peername,content,date,isread FROM CHATDATA WHERE DATE>= 
                                        (SELECT DATE FROM CHATDATA WHERE ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?)) AND ISREAD =0 ORDER BY DATE ASC LIMIT 0,1)
                                         AND ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?))  ORDER BY DATE ASC`,
                                            [username, peer.peername, peer.peername, username, username, peer.peername, peer.peername, username],
                                            (err,/** @type {{username:string,peername:string,content:string,date:string,isread:Number}[]}*/
                                                rows) => {
                                                //set rows by format of chatsigledata[]
                                                /**@type {{peername:string,userpic:string,chatdata:{iscurrentuser:string,content:string,date:string}[],lastSpeak:string,isMeSpeakNow:boolean}} */
                                                let chatsigledata = {};
                                                chatsigledata.peername = peer.peername;
                                                chatsigledata.userpic = row.userpic;
                                                chatsigledata.chatdata = [];
                                                rows.forEach(sigle => {
                                                    /**@type {{iscurrentuser:string,content:string,date:string}} */
                                                    let chatsigle = { iscurrentuser: sigle.username == username, content: sigle.content, date: sigle.date }
                                                    chatsigledata.chatdata.push(chatsigle);
                                                });
                                                // chatsigledata.lastSpeak = chatsigledata.chatdata[chatsigledata.chatdata.length - 1];
                                                chatdatarray.push(chatsigledata);
                                                if (i == peersArray.length - 1) {
                                                    http.response.writeHead(200, {
                                                        'Content-Type': 'text/plian;charset=utf-8',
                                                        'Access-Control-Allow-Origin': '*'
                                                    });
                                                    http.response.end(JSON.stringify(chatdatarray, (k, v) => { return v; },'    '))
                                                }
                                            });
                                    });

                                });
                        }
                    });
            });
            // }
        }
}
/**
 * 根据cookie查看是否登录,30分钟过期。
 * @param {{request:IncomingMessage}} http request.cookie
 */
async function getCookieObject(http) {
    return await getQueryString(await btoaEncrypt('token', encodingTimes), http.request.headers.cookie, ';');
}
async function getloginedUser(http) {
    return await atobDecrypt(await getCookieObject(http), encodingTimes);
}