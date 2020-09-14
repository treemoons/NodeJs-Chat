import {
    getQueryString,
    btoaEncrypt,
    buildCookie,
    __dirname,
    getTodayDawn, atobDecrypt
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
sqlite3.all(
    `SELECT * FROM CHATDATA where date> '20200914' `, (err, rows) => {
        console.log(rows)
    }
)
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
                                if (err != undefined || err != null) {
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
                    sqlite3.serialize(() => {
                        let username = getQueryString('username', d.toString(), '&');
                        /** @type {{username:string,password:string,isremember:boolean,expire:Date}} */
                        sqlite3.get('SELECT COUNT(*) WHERE USERNAME=? AND PASSWORD=? ',
                            [username, getQueryString('password', d.toString(), '&')], (err, row) => {
                                if (err != undefined) {
                                    let cookie = buildCookie(await btoaEncrypt('token', encodingTimes), await btoaEncrypt(username, encodingTimes), {
                                        minutes: 30
                                    });

                                    http.response.writeHead(200, {
                                        'Set-Cookie': `${cookie}`
                                    });
                                    http.response.write(d.toString());
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
    'loaddata':
        /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        http => {
            // if (isLogined()) {
            sqlite3.serialize(() => {
                sqlite3.all(
                    `SELECT * FROM CHATDATA C,USERLOGIN L WHERE DATE>= ?`,
                    getTodayDawn().formatDate('yyyyMMdd.HHmmss'), (err, rows) => {
                        sqlite3.run('update chatdata set isread=1 where isread=0', err => {console.error('set read err!'); });
                        //set rows by format of chatsigledata[]
                    /**@type {{username:string,userpic:string,chatdata:{iscurrentuser:string,content:string,date:string}[],lastSpeak:string,isMeSpeakNow:boolean}[]} */
                        let chatsigledata;
                        let username =await getloginedUser(http);
                    }
                )
            })
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
    return await atobDecrypt(getCookieObject(http),encodingTimes);
}