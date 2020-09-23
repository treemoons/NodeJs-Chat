import { IncomingMessage, ServerResponse } from 'http';
export default {
    /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
    mytest: async http => {
        http.response.writeHead(200, { 'Content-Type':'text/plain'})
        http.response.write('test import ,yes');
        http.response.end();
    }
}
export async function get() {
    console.log('test')
}