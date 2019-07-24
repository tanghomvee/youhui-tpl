import {
	RECORD_USERINFO,
	GET_USERINFO,
	OUT_LOGIN,
	RETSET_NAME,
	GO_LOGIN,
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

import {localapi, proapi} from 'src/config/env'

export default {
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('userInfo', JSON.stringify(info));
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state) {
		let info = getStore('userInfo');
		console.log("获取本地info="+info);
		info = JSON.parse(info);
		state.userInfo = info;
	},
	//修改用户名
	[RETSET_NAME](state,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = {};
		state.login = false;
	},
	//前往登录
	[GO_LOGIN](state) {
		state.userInfo = {};
		state.login = false;
	},

}
