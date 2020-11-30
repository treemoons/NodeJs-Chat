import { readFile, readFileSync } from 'fs';
import http from 'http';
import http2 from 'http2';
import { loadSource, notMatchRoute } from './myfunc.js';
import { parse } from 'url';

function start() {
	/**
	 * 
	 * @param {http2.Http2ServerRequest} request
	 * @param {http2.Http2ServerResponse} response 
	 */
	async function onRequest(request, response) {
		const pathname = parse(request.url);
		if (pathname.pathname == "/favicon.ico") {
			//get the favicon.ico file
			return;
		}

		if (/^\/[^\.]+\.([^?]+)\??(.*)/.test(request.url)) {
			console.log('extension:' + RegExp.$1);
			console.log('querystring:' + RegExp.$2);
			await loadSource(response, RegExp.$1, request.url, '.');
			return;
		}
		//#region deal with Controllers/Actions/parameters... via regulation expresion ,

		let routeWithParams = pathname.pathname.toLowerCase().match(/\/.[^/?]+/g);
		let controller;
		let action;
		let params = [];
		if (routeWithParams != null) {
			if (routeWithParams.length < 2) {
				controller = routeWithParams[0].replace('/', '')
			} else if (routeWithParams.length >= 2) {
				controller = routeWithParams[0].replace('/', '');
				action = routeWithParams[1].replace('/', '');
				if (routeWithParams.length > 2) {
					for (let i = 2; i < routeWithParams.length; i++) {
						params.push(routeWithParams[i].replace('/', ''));
					}
				}
			}
		}
		//#endregion
		console.log("pathname: \x1b[36;3;1m%s\x1b[0m", pathname.pathname)
		console.log("url: \x1b[36;3;1m%s\x1b[0m", request.url)
		console.log('controllername: \x1b[36;3;1m%s\x1b[0m', controller)
		console.log("actionname: \x1b[36;3;1m%s\x1b[0m", action)
		console.log("params: \x1b[36;3;1m%s\x1b[0m", params)
		// let query = pathname.query.match(/[^&=]+=[^&]*/g)
		// console.log(query)

		// 首页 home page
		if (pathname.pathname == '/') {
			response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
			readFile('.\\layout/nodejstest.html', (e, d) => {
				// console.log("write html: " + d.slice(0, 10))
				if (e) {
					console.log(e)
				} else {
					response.write(d.toString());
					response.end();
				}
			});
			return ;
		}
		if (controller) {
			response.on('error', err => {
				if (!err.message.concat('write after end')) {
					console.log(err.message);
				}
			});
			// request with controller ,to do below
			if (await notMatchRoute({ controller: controller, action: action }, { request, response, params })) {
				// d cound't find route,than to do below 
				// request without controller ,to do below,defualt redirect to index page.

				// go back home
				response.writeHead(301, { "Location": '/' });
				response.end();
			}
		}
	}
	let cert = readFileSync('.\\ssl/localhost.crt');
	let key = readFileSync('.\\ssl/localhost.key');
	// let server = http.createServer(onRequest).listen(8008);
	let server2 = http2.createSecureServer({ cert: cert, key: key }, onRequest)

	// server2.on('error', (err) => console.error(err));

	// server2.on('stream', (stream, headers) => {
	// 	// 流是一个双工流。
	// 	stream.respond({
	// 		'content-type': 'text/html; charset=utf-8',
	// 		':status': 200
	// 	});
	// 	stream.end('<h1>你好世界</h1>');
	// });
	server2.listen(8888);

	console.log("Server has started.see'http://127.0.0.1:8008'");
	console.log("Server2 has started.see'https://127.0.0.1:8888'");

}
start();
