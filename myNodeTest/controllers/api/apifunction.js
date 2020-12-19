import {
	getQueryString,
	btoaEncrypt,
	buildCookie,
	getTodayDawn,
	getloginedUser,
	getSpanDate
} from '../../src/utils/utils.js'; //相对该文件的相对位置
import {
	Http2ServerRequest,
	Http2ServerResponse
} from 'http2';
import sqlite3modlue from 'sqlite3';
import { writeFileSync } from 'fs';
const {
	Database
} = sqlite3modlue;

const utf8 = 'utf-8';
let listeningoutime = 30;
let sqlite3 = new Database('.\\data.db'); //node运行时，启动的文件夹的相对位置

/**@type {{userHTTP:{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}}} */
let listeningHttp = {}
/**@type {number} */
let encodingTimes = 10;
// sqlite3.all(`select username,peername,content,date,isread from T_CHAT_DATA 
//                 where ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?)) ORDER BY DATE ASC LIMIT ?,?`,
//     ['treemoons', 'name', 'name', 'treemoons', 0, 1], (err, row) => {
//         console.log(row)
//         console.log(err)
//     })


export default {
	/** @param {{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}} http */
	default: async http => {
		try {
			let t = 'treemoons';
			listeningHttp[t] = [http, 30];
			http.request.on('data', d => {
				let re = http.response
				console.log("default:  " + d.toString());
				listeningHttp[t][0]?.response.end('ddd', () => {
					console.log('dddddddd--------')
				});
				console.log('test')
				re?.end('1', () => {
				});
				let a = 1
				re.on('error', err => {
					listeningHttp[t][0]?.response.end('ddd', () => {
					});
					if (a > 2) {
						re = undefined;
						listeningHttp[t][0] = undefined
					}
					a++;
					console.log('err1,in default.')
				})
				re.once('finish', () => {
					console.log('finish')
				})

			})
		} catch (e) {
			console.log("-------------------\n" + e)
		}
		finally {
		}

		throw 'error end on';

	},
	/** @param {{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}} http */
	login: async http => {
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
								let cookie = await buildCookie(key, value, {
									seconds: 30
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
						});
				});
			} else {
				//  console.log(`data is : ${d}`)
				http.response.end(d)
			}
		})

	},

	/** @param {{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}} http */
	loaddata: async http => {
		/** 加载的表示好友个数 */
		let count = 0;
		let username = 'treemoons' //await getloginedUser(http); // 获取登录过后的用户名，使用base64加密，加密次数为encodingTimes；
		if (username) //{
			sqlite3.serialize(() => {
				/**@type {{peername:string,peerpic:string,chatdata:{iscurrentuser:string,content:string,date:number,isread:number}[],lastSpeak:string,isMeSpeakNow:boolean}[]} */
				let chatdatarray = [];
				// sqlite3.get(`SELECT USERPIC FROM T_USER_LOGIN WHERE USERNAME=?;`,
				//     username, (err,/**@type {{date:number|Number,peerpic:string}} */ row) => {
				//         if (err.isNullOrUndefined()) {
				sqlite3.all(`SELECT distinct peername FROM(select peername as peername from T_CHAT_DATA where USERNAME=? union select username from T_CHAT_DATA  where peername=?) `,
					[username, username],
					(err, /** @type {{peername:string}[]}*/
						peers) => {
						if (peers.length > 0 && !err)
							peers.forEach(peer => {
								/**@type {{peername:string,peerpic:string,chatdata:{iscurrentuser:string,content:string,date:number,isread:number}[],lastSpeak:string,isMeSpeakNow:boolean}} */
								let chatsigledata = {};
								sqlite3.all(`SELECT username,peername,content,date,isread FROM T_CHAT_DATA WHERE (DATE>= 
                                        (SELECT DATE FROM T_CHAT_DATA WHERE ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?))
                                         AND ISREAD =0 ORDER BY DATE ASC LIMIT 0,1) OR DATE>=${parseFloat(getTodayDawn().formatDate('yyyyMMdd.HHmmss'))}) 
                                         AND ((USERNAME =? AND PEERNAME=?) or(USERNAME =? AND PEERNAME=?))  ORDER BY DATE ASC`,
									[username, peer.peername, peer.peername, username, username, peer.peername, peer.peername, username],
									(err, /** @type {{username:string,peername:string,content:string,date:Number,isread:Number}[]}*/
										rows) => {
										sqlite3.get(`SELECT USERPIC FROM T_USER_LOGIN WHERE USERNAME=?;`,
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
												// console.log(chatsigledata)
												// if (err == null) {
												// chatsigledata.lastSpeak = chatsigledata.chatdata[chatsigledata.chatdata.length - 1];

												chatdatarray.push(chatsigledata);
												if (count === peers.length) {
													console.log("最后的i的值(表示好友个数)：" + count)
													console.log('--------------------------------------------------------------------------------------')
													http.response.writeHead(200, {
														'Content-Type': 'text/plian;charset=utf-8',
														'Cache-Control': ' public, max-age=0'
													});
													http.response.end(JSON.stringify(chatdatarray, (k, v) => v, '    '))
												}
											}
										);
									}
								);
							});
						else {
							http.response.end()
						}
					});
			});

	},

	/** @param {{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}} http */
	gethistory: async http => {
		http.request.on('data', d => {
			/**@type {{ peername: string, ignorecount: number , requestcount: number}} */
			let data = JSON.parse(d.toString());
			console.log("apifunction.js--->192:")
			console.log(data);
			let username = 'treemoons' //await getloginedUser(http); // 获取登录过后的用户名，使用base64加密，加密次数为encodingTimes；
			if (username)
				sqlite3.all(`select username,peername,content,date,isread from T_CHAT_DATA 
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
							http.response.writeHead(200, {
								'Content-Type': 'text/plian;charset=utf-8'
							});
							http.response.end(JSON.stringify({ data: datarows }, (k, v) => v, '    '))
						} else {
							http.response.end()
						}

					});

		})

	},

	/** 发送消息
	 * @param {{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}} http */
	chatto: async http => {
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
					sqlite3.run(`INSERT INTO T_CHAT_DATA(USERNAME,PEERNAME,CONTENT,DATE,ISREAD) VALUES(?,?,?,?,0);`,
						[username, data.peername, data.content,],
						async err => {
							if (!err) {
								msg.msg = err.message;
							} else {
								msg.status = 1;
								//send to logined

								//检查是否对方登录超时
								if (listeningHttp[data.peername] && await getloginedUser(listeningHttp[data.peername])) {
									let chatmessage = JSON.stringify({ peername: data.peername, content: data.content, date: data.date, isread: 0 })
									listeningHttp[data.peername]?.response.end(chatmessage);
									listeningHttp[data.peername]?.response.once('finish', err => {
										sentSave(username, data);
									});
									listeningHttp[data.peername]?.response.on('error', err => {
										//超时不再请求
										if (!listeningHttp[data.peername])
											listeningHttp[data.peername]?.response.end(chatmessage);
									});
								}
							}
							http.response.end(JSON.stringify(msg))
						});
				} else {
					http.response.writeHead(200, {
						"Content-Type": "text/plain"
					});
					http.response.end(JSON.stringify(msg))
				}
			}
		});
	},

	/** @param {{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}} http */
	listening: async http => {
		// listeningHttp[await getloginedUser(http)] = [http, getSpanDate({ seconds: listeningoutime })];
		listeningHttp['treemoons'] = http;
		setTimeout(() => {
			delete listeningHttp['username'];
		}, listeningoutime);
		// getSpanDate({ seconds: listeningoutime });

		// listeningHttp['treemoons'].response.setHeader('Content-Type', 'text/plain');
	},


	/**
	 * 主动退出登录需要调用
	 * @param {{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}} http
	 */
	logout: async http => {
		let username = await getloginedUser(http)
		if (username)
			delete listeningHttp[username];
	},

	/** @param {{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}} http */
	receivedFile: async http => {
		let accept = http.request.headers["datainfo"];
		/**@type { {usertopeer: string|'username-peername', fileExtension: string|'gif',filesize: number,date:string}} */
		let datainfo = JSON.parse(accept);
		let filename = `${datainfo.usertopeer}=${datainfo.date}.${datainfo.fileExtension}`
		http.request.on('data', data => {
			/**@type {ArrayBuffer} */
			let d = data;
			writeFileSync(filename, d, { encoding: 'binary', flag: 'as' }, () => { })
			console.log(d.byteLength)
		});
		http.request.on('end', () => {
			console.log('end...')
			http.response.setHeader("Access-Control-Allow-Headers", '*')
			http.response.end(`.\\src/img/${filename}`);
		});
	}

}

function sentSave(username, data) {
	// listeningHttp[data.peername][0] = undefined;
	//sent before being saved 
	sqlite3.run(`UPDATE T_CHAT_DATA SET ISREAD =1 WHERE USERNAME=? AND PEERNAME=?; AND DATE=?`,
		[username, data.peername, data.date],
		err => { });
}
