import { existsSync, readFile, readFileSync, writeFileSync } from "fs";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import routes from '../../controllers.js';
import mine from './longfunctions/getMIMEByFileName.js';

export const getMIMEByFileName = mine;
/**
 * @param {'string'} fmt 毫秒不可设置位数
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
 * 写入日志到文件当前/logs文件夹下,以日期命名/
 *  {'HH:mm:ss':[{ tip: tip, content: text, date: 'yyyy-MM-dd HH:mm:ss.f'}...]}
 * @param {string} text 日志内容
 * @param {string} tip 自定义的提示
 */
export async function writeLogsAsJSON(text, tip = '') {
	let date = new Date();
	let filename = './logs/json' + date.formatDate('yyyyMMdd') + '.json';
	let logs;
	let log = { tip: tip, content: text, date: date.formatDate('yyyy-MM-dd HH:mm:ss.f') };
	if (existsSync(filename)) {
		let logsStr = readFileSync(filename, { flag: 'r' }).toString();
		logs = logsStr ? JSON.parse(logsStr) : '';
	} else {
		let logs = {};
	}
	logs[new Date().formatDate('HH:mm:ss')] = log;
	writeFileSync(filename, JSON.stringify(logs), { encoding: 'utf-8', flag: 'w' });
}
/**
 * 写入日志到文件当前/logs文件夹下,以日期命名无后缀
 * @param {string} text 日志内容
 * @param {string} tip 自定义的提示
 */
export function writeLogs(text, tip = '') {
	let date = new Date();
	let filename = './logs/' + date.formatDate('yyyyMMdd');
	let log =
		`\n
---------------------------------
${date.formatDate('yyyy-MM-dd HH:mm:ss.f')}  ${(tip ? '[' + tip + ']' : '')}
---------------------------------
${text}\n`
	writeFileSync(filename, log, { encoding: 'utf-8', flag: 'a' });
}

/**
 * 在指定格式(?)[key]=[value][splitMark]中，根据key找到value值，若没找到，返回空
 * @param {string} name search keywords
 * @param {string} purposeString results pool
 * @param {'&'|';'} splitMark
 * 
 */
export async function getQueryString(name, purposeString, splitMark = '&') {
	let reg = RegExp(`${name}=([^${splitMark}]+)`);
	reg.test(purposeString)
	return RegExp.$1;
}
/**
 * 
 * @param {Http2ServerResponse} response 
 * @param {string} corsUrl 
 */
export function setCORS(response, corsUrl = '*') {
	response.setHeader('Access-Control-Allow-Origin', corsUrl);
}
export async function getAllQueryString(purposeString, splitMark) {
	let reg = RegExp(`[^\\=;]+=[^${splitMark}]+;`, 'g');
	return purposeString.match(reg);
}
export let line = '--------------------------------------------------------------------------------------'

/**
 * deal with matched controllers/action/params... 
 * @param {{controller:string,action:string}} arguments[0] like 'controller','action'
 * @param {{ request:Http2ServerRequest, response:Http2ServerResponse, params:string[] }}
 * @returns if matched,returns void,otherwise return true;
 */
export async function notMatchRoute({ controller, action }, http) {
	/**@type {{ request, response, params:string[] }} */
	const { request, response, params } = http;
	setCORS(response);
	console.log('controllername: \x1b[36;3;1m/%s\x1b[0m', controller)
	let actionRoute = routes[controller];
	params.unshift(action);
	let parameters, i = 0;
	while (actionRoute) {
		switch (typeof actionRoute) {
			case 'function':
				if (i != params.length)
					parameters = params.slice(i);
				http = { request, response, parameters };
				actionRoute(http).catch(err => {
					writeLogs(err)
					console.error("Default Error:  \n" + err);
				});
				action = params.slice(0, i).toString().replace(',', '/');
				console.log("actionname: \x1b[36;3;1m%s\x1b[0m", action)
				console.log("params: \x1b[36;3;1m%s\x1b[0m", parameters?.toString().replace(/,/g, '/'))
				return false;
			case 'object':
				actionRoute = actionRoute[params[i]];
				i++;
				break;
		}
	}
	return true;
}


/**
 * 
 * @param {string} name
 * @param {string} value
 * @param {{year:number, month:number, day:number, hour:number,minutes:number,seconds:number, milliseconds:number }} param2 date default now (all values is '0')
 * @param {string} path 
 * @param {true|false} httponly 
 */
export async function buildCookie(name, value,
	{ year = 0, month = 0, day = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {},
	path = undefined, httponly = false) {
	let cookie = `${name}=${value};${(arguments[2]
		? `expires=${getSpanDate({ year: year, month: month, day: day, hours: hours, minutes: minutes, seconds: seconds, milliseconds: milliseconds }).toUTCString()};`
		: '')}`
		+ (path ? `path = ${path};` : '')
		+ (httponly ? 'httponly' : '');
	console.log(cookie);
	return cookie;
}

/**
 * 
 * @param {string} str 
 * @param {number} times
 */
export async function atobDecrypt(str, times = 1) {
	for (let i = 0; i < times; i++) {
		str = Buffer.from(str, 'base64').toString('utf-8')
	}
	return str;
}
/**
 *
 * @param {string} str
 * @param {number} times
 */
export async function btoaEncrypt(str, times = 1) {
	for (let i = 0; i < times; i++) {
		str = Buffer.from(str, 'utf-8').toString('base64')
	}
	return str;
}



/**
 * 根据cookie查看是否登录,30分钟过期。
 * @param {{request:Http2ServerRequest}} http request.cookie
 */
export async function getloginedUser(http) {
	let loginCookie = await getQueryString(await btoaEncrypt('token', encodingTimes), http.request.headers.cookie, ';');
	if (loginCookie)
		return await atobDecrypt(loginCookie, encodingTimes);
	else
		return undefined;
}


/**
 * date default now (all values are '0')
 * @param {{ year:number, month:number, day:number,hours:number , minutes:number,seconds:number, milliseconds:number }}  
 */
export function getSpanDate(
	{ years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {}) {
	let date = new Date();
	if (years)
		date.setFullYear(date.getFullYear() + years);
	if (months)
		date.setMonth(date.getMonth() + months);
	if (days)
		date.setDate(date.getDate() + days);
	if (hours)
		date.setHours(date.getHours() + hours);
	if (minutes)
		date.setMinutes(date.getMinutes() + minutes);
	if (seconds)
		date.setSeconds(date.getSeconds() + seconds);
	if (milliseconds)
		date.setMilliseconds(date.getMilliseconds() + milliseconds);
	return date;
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
 * 删除除img标签以外的所有HTML标签，
 * @param {string} str 
 */
export function removeHTML(str) {

	let symbol = `_img_`;
	//删除脚本  
	str = str.replace("<script[^>]*?>.*?</script>", "");
	let match = str.match(/<img[^>]*>/gi);
	str = str.replace(/<img[^>]*>/gi, symbol);
	//删除HTML  
	str = str.replace(/<(.[^>]*)>/gi, "");
	str = str.replace(/([\r\n])[\s]+/gi, "");
	str = str.replace(/-->/gi, "");
	str = str.replace(/<!--.*/gi, "");
	str = str.replace(/&(quot|#34);/gi, "\"");
	str = str.replace(/&(amp|#38);/gi, "&");
	str = str.replace(/&(lt|#60);/gi, "<");
	str = str.replace(/&(gt|#62);/gi, ">");
	str = str.replace(/&(nbsp|#160);/gi, "   ");
	str = str.replace(/&(iexcl|#161);/gi, "\xa1");
	str = str.replace(/&(cent|#162);/gi, "\xa2");
	str = str.replace(/&(pound|#163);/gi, "\xa3");
	str = str.replace(/&(copy|#169);/gi, "\xa9");
	str = str.replace(/&#(\d+);/gi, "");

	str.replace("<", "");
	str.replace(">", "");
	str.replace("\r\n", "");
	match.forEach(v => {
		let font = str.substr(0, str.indexOf(symbol))
		let behind = str.substr(str.indexOf(symbol) + symbol.length)
		str = font + v + behind;
	})
	return str;
}

/**
 * Get the source which can be file/img/text and son on 
 * @param {Http2ServerResponse} response response 
 * @param {string} extension 
 * @param {string} srcDir relative to CWD ,default '.'
 * for example CWD is '/project',srcDir is 'project/src' ,srcDir can be '.'
 * @param {string} url like '/controller/action/param?key=value...'
 */
export async function loadSource(response, extension, url, srcDir = '.') {
	// request without controller ,to do below,defualt redirect to index page.
	console.log('-----' + url)
	console.log(srcDir + url)
	readFile(srcDir + url, async (e, d) => {
		// console.log("write html: " + d.slice(0, 10))
		if (e) {
			response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
			// do other things
			console.log(e);
			response.end("没找到！");
		} else {
			response.writeHead(200, { 'Content-Type': await getMIMEByFileName(extension) })
			console.log('file-size:' + d.length);
			response.end(d);
		}
	});


}


!async function (d) {
	console.log(await getMIMEByFileName(d))
}('.html')
console.log('test');
