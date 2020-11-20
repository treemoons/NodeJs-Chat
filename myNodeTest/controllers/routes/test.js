import { IncomingMessage, ServerResponse, } from 'http';
export default {
    /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
    mytest: async http => {
        http.response.writeHead(200, { 'Content-Type':'text/plain'})
        http.response.write('test import ,yes');
        http.response.end();
    },
    default:
        /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        async http => {
            http.response.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
            // do other things
            console.log('test')
            http.response.end("没找到！");
        }
}
export async function get() {
    console.log('test')
}

