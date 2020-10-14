import { IncomingMessage, ServerResponse } from 'http';
import * as api from './apifunction.js';
let listeningHttp = {}
/** 默认是需要登录才能使用 */
export default {
    default:
        /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        async http => {

            try {
                let t = 'treemoons';
                listeningHttp[t] = [http, 30];
                http.request.on('data', d => {
                    let re = http.response
                    console.log("default:  " + d.toString());
                    listeningHttp[t][0]?.response.end('ddd', () => {
                        console.log('dddddddd--------')
                    });
                    console.log('test')
                    re?.end('1', () => {
                    });
                    let a = 1
                    re.on('error', err => {
                        listeningHttp[t][0]?.response.end('ddd', () => {
                             console.log('dddddddd--------')
                         });
                        if (a > 10) {
                            re = undefined;
                            listeningHttp[t][0]=undefined
                        }
                        a++;
                        console.log('err1,in default.')
                    })
                    re.once('finish', () => {
                        console.log('finish')
                    })

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
    test1: api.test,
    // }
    sentmessage: /** @param {{request:IncomingMessage,response:ServerResponse,params:string[]}} http */
        async http => { }

}