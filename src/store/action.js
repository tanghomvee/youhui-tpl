import {
	getUser,
	getAddressList
} from '../service/getData'
import {
	GET_USERINFO,
	SAVE_ADDRESS
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state
	}) {
		console.log("action==")
		commit(GET_USERINFO)
	},
	async isOldToken({
		commit,
		state
	},msg,callback) {
		console.log("msg=="+msg);
	},
}