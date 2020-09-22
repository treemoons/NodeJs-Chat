import { readFile } from 'fs';
import http from 'http';
import {setCORS} from './myfunc.js';
import { parse } from 'url';
import * as routes from './controllers.js';
function start() {
    /**
     * 
     * @param {http.IncomingMessage} request
     * @param {http.ServerResponse} response 
     */
    function onRequest(request, response) {
        console.log(request.url);
        const pathname = parse(request.url);
        if (pathname.pathname == "/favicon.ico") {
            //get the favicon.ico file
            return;
        }

        let routeWithParams = pathname.pathname.toLowerCase().match(/\/[^/?]+/g);
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
        
        /**
         * 
         * @param {{controller:string,action:string}} route like 'controller','action'
         */
        function matchRoute({ controller, action }) {
            if (routes == undefined || routes == null) return;
            for (let controllerName in routes) {
                if (controller == controllerName) {
                    for (let actionName in routes[controllerName]) {
                        if (action == actionName) {
                            setCORS(response)
                            routes[controllerName][actionName]({ request, response, params });
                            return true;
                        }
                    }
                    setCORS(response)
                    routes[controllerName]['default']({ request, response, params });
                    return true;
                }
            }
            return false;
        }

        console.log("actionname:" + action)
        // let query = pathname.query.match(/[^&=]+=[^&]*/g)
        // console.log(query)

        if (controller) {
            // request with controller ,to do below
            if (!matchRoute({ controller: controller, action: action })) {
                // cound't find route,than to do below 
                response.writeHead(200, { 'Content-Type':'text/html; charset=utf-8' });
                readFile('.\\layout/nodejstest.html', (e, d) => {
                    if (e) {
                        console.log(e)
                    } else {
                        response.write(d.toString());
                        response.end();
                    }
                })
            }
        } else {
            // request without controller ,to do below,defualt redirect to index page.
            response.writeHead(200, { "Content-Type": "text/html" });
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
