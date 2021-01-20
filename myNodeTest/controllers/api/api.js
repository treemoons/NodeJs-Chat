import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import api from './apidetail.js';
/** 默认是需要登录才能使用 */
export default {
    default: api.default,
    chatto: api.chatto,
    login: api.login,
    /**加载所有的聊天记录，截止到未读或今天凌晨 */
    loaddata: api.loaddata,
    /**查找历史信息记录
     * POST: { peername: string, ignorecount: number , requestcount: number}
     */
    gethistory: api.gethistory,
    listening: api.listening,
    // }
    sentmessage: {
        test:/** @param {{request:Http2ServerRequest,response:Http2ServerResponse,params:string[]}} http */
            async http => {

                http.response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
                // do other things
                http.response.end(`sentmessage: {
        test！`);
            }
    }

}