import { IncomingMessage, ServerResponse } from 'http';
export default {
    /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
    mytest: http => {
        http.response.writeHead(200, { 'Content-Type':'text/plain'})
        http.response.write('test import ,yes');
        http.response.end();
    }
}
export function get() {
    console.log('test')
}