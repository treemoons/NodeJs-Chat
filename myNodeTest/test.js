
import sqlite3modlue from 'sqlite3';
const {
    Database
} = sqlite3modlue;
let sqlite3 = new Database('.\\data.db'); //node运行时，启动的文件夹的相对位置
sqlite3.serialize(() => {
    let username = 'treemoons' //await getloginedUser(http);
    console.log('test')
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
                            sqlite3.all(`SELECT username,peername content,date,isread FROM CHATDATA WHERE DATE>= 
                                        (SELECT DATE FROM CHATDATA WHERE ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?)) AND ISREAD =0 ORDER BY DATE ASC LIMIT 0,1)
                                         AND ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?))  ORDER BY DATE ASC`,
                                [username, peer.peername, peer.peername, username, username, peer.peername, peer.peername, username],
                                (err,/** @type {{username:string,peername:string,content:string,date:string,isread:Number}[]}*/
                                    rows) => {
                                    //set rows by format of chatsigledata[]
                                    /**@type {{peername:string,userpic:string,chatdata:{iscurrentuser:string,content:string,date:string}[],lastSpeak:string,isMeSpeakNow:boolean}} */
                                    let chatsigledata = {};
                                    chatsigledata.peername = peers.peername;
                                    chatsigledata.userpic = row.userpic;
                                    chatsigledata.chatdata = [];
                                    rows.forEach(sigle => {
                                        /**@type {{iscurrentuser:string,content:string,date:string}} */
                                        let chatsigle = { iscurrentuser: sigle.username == username, content: sigle.content, date: sigle.date }

                                        chatsigledata.chatdata.push(chatsigle);
                                    });
                                    // chatsigledata.lastSpeak = chatsigledata.chatdata[chatsigledata.chatdata.length - 1];
                                    chatdatarray.push(chatsigledata);
                                    if (i == peersArray.length - 1)
                                        console.log(JSON.stringify(chatdatarray))
                                });


                        });
                    });
            } else {
                console.log('test-err:' + err)
            }
        });
});
/**@type{[]} */
let t = JSON.parse(`[
    {
        "peerpic": "",
        "peername": "apply",
        "chatdata": [
            {
                "iscurrentuser": false,
                "content": "niha",
                "date": "20200910.121822"
            }
        ]
    },
    {
        "peerpic": "",
        "peername": "d",
        "chatdata": [
            {
                "iscurrentuser": false,
                "content": "data",
                "date": "11"
            }
        ]
    },
    {
        "peerpic": "nnnnnnNNN",
        "peername": "name",
        "chatdata": [
            {
                "iscurrentuser": false,
                "content": "data",
                "date": "11"
            },
            {
                "iscurrentuser": true,
                "content": "conent','ss'",
                "date": "2020090.121822"
            },
            {
                "iscurrentuser": true,
                "content": "conent",
                "date": "2020910.121822"
            }
        ]
    }
]`);

t.forEach(async v => {
    console.log(v.chatdata)
});
console.log('end the log')