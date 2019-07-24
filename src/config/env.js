/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = 'http://www.aibaohe.cn/';   
// let baseUrl = 'http://192.168.1.115/lpb/api';  
let routerMode = 'hash';
let imgBaseUrl;


export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}