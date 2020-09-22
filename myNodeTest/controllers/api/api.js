import * as api from './apifunction.js';

/** 默认是需要登录才能使用 */
export default {
    default:
        /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        http => {

            try {
                http.request.on('data', d => {
                    console.log(d.toString())
                })
            } catch (e) {
                console.log("-------------------\n" + e)
            }
            finally {
                http.response.end();
            }

        },
    chatto: api.chatto,
    login: api.login,
    /**加载所有的聊天记录，截止到未读或今天凌晨 */
    loaddata: api.loaddata,
    /**查找历史信息记录
     * POST: { peername: string, ignorecount: number , requestcount: number}
     */
    gethistory: api.gethistory,
    listening: api.listening,
    test: api.test ,
    // }
    sentmessage: /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        async http => { }

}