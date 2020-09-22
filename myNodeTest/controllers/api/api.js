import * as api from './apifunction.js';

export default {
    default:
        /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        http => {

            try {
                http.request.on('data', d => {
                    console.log(d.toString())
                })
            } catch (e) {
                console.log("-------------------" + e)
            }
            finally {
                http.response.end();
            }

        },
    chatto: api.chatto,
    login: api.login,
    /**加载所有的聊天记录，截止到未读或今天凌晨 */
    loaddata: api.loaddata,
    gethistory: api.gethistory,
    // }
    sentmessage: /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        async http => { }

}