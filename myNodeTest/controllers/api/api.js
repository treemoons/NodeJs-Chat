import { IncomingMessage, ServerResponse } from 'http';
import * as api from './apifunction.js';

/** 默认是需要登录才能使用 */
export default {
    default:
        /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        async http => {

            try {
                http.request.on('data', d => {
                    let re = http.response
                    console.log("default:  " + d.toString());

                    console.log('test')
                    re?.end('1', () => {
                    });
                    let a = 1
                    re.on('error', err => {
                        if (a > 10) {
                            re = undefined
                        }
                        a++;
                        // try{re.setHeader('', '');}catch{console.log('sethear')}
                        
                        re?.end('2', () => {
                            console.log(a+'\n jieshude ')
                        })
                        console.log('err1,in default.')
                    })
                    re?.end('12', () => {
                        console.log('12 diyici')
                    });

                })
            } catch (e) {
                console.log("-------------------\n" + e)
            }
            finally {
            }

                    throw 'error end on';

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
    test: api.test,
    // }
    sentmessage: /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        async http => { }

}