import { readFile } from 'fs';
import http from 'http';
import { setCORS, writeLogs } from './myfunc.js';
import { parse } from 'url';
import routes from './controllers.js';

let line = '--------------------------------------------------------------------------------------'
function start() {
    /**
     * 
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response 
     */
    function onRequest(request, response) {
        const pathname = parse(request.url);
        if (pathname.pathname == "/favicon.ico") {
            //get the favicon.ico file
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
        /**
         * deal with matched controllers/action/params... 
         * @param {{controller:string,action:string}} route like 'controller','action'
         * @returns if matched,returns void,otherwise return true;
         */
        function notMatchRoute({ controller, action }) {
            for (let controllerName in routes) {
                if (controller == controllerName) {
                    if (!action) {
                        setCORS(response);
                        routes[controllerName]['default']({ request, response, params }).catch(err => {
                            writeLogs(err)
                            console.error("Default Error:  \n" + err)
                        });
                        return;
                    }
                    for (let actionName in routes[controllerName]) {
                        if (action == actionName) {
                            setCORS(response)
                            routes[controllerName][actionName]({ request, response, params }).then(
                                e => console.log(line)
                            ).catch(err => {
                                writeLogs(err)
                                console.error(err)
                            });
                            return;
                        }
                    }
                   
                    return;
                }
            }
            return true;
        }
        console.log("pathname: \x1b[36;3;1m%s\x1b[0m", pathname.pathname)
        console.log("url: \x1b[36;3;1m%s\x1b[0m", request.url)
        console.log('controllername: \x1b[36;3;1m%s\x1b[0m', controller)
        console.log("actionname: \x1b[36;3;1m%s\x1b[0m", action)
        // let query = pathname.query.match(/[^&=]+=[^&]*/g)
        // console.log(query)

        if (controller) {
            response.on('error', err => {
                if (!err.message.concat('write after end')) {
                    console.log(err.message);
                }
            })
            // request with controller ,to do below
            if (notMatchRoute({ controller: controller, action: action })) {
                // d cound't find route,than to do below 
                // request without controller ,to do below,defualt redirect to index page.

                switch (controller) {
                    case 'src':
                        response.writeHead(200, { "Content-Type": "image/jpeg;image/png;image/gif;text/html;charset=utf-8" });

                        readFile("." + pathname.pathname, (e, d) => {
                            // console.log("write html: " + d.slice(0, 10))
                            if (e) {
                                console.log(e)
                            } else {
                                console.log(d.length)
                                response.end(d);
                            }
                        })
                        break;

                    default:
                        response.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
                        // do other things
                        console.log('test')
                        response.end("没找到！");
                        break;
                }
            }
        } else {
        // no any controllers...
            response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            // 首页 home page
            console.log('und')
            readFile('.\\layout/nodejstest.html', (e, d) => {
                // console.log("write html: " + d.slice(0, 10))
                if (e) {
                    console.log(e)
                } else {
                    response.write(d.toString());
                    response.end();
                }
            })
        }
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.see'http://127.0.0.1:8888'");
}
start()
