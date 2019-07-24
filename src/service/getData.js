import fetch from '../config/fetch'
import {getStore,httpGet,jqHttp,httpPost,request} from '../config/mUtils'


const base = "http://www.aibaohe.cn/"
export function bindOpenId ({phoneNo,openid,code,invitCode}) {
  return request(`${base}/youhui/wechat/bind?phoneNo=${phoneNo}&openid=${openid}&code=${code}&invitCode=${invitCode}`, {
    method: 'get'
  })
}






