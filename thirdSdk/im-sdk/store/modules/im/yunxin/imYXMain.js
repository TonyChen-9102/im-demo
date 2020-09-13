import config from "../../../../config/index.js"
const NIM = require("../../../../sdk/nim/" + config.yxSdkPath)
import ImLoginState from "../../../../dictionary/ImLoginState.js"
import ImMsgTypeDic from "../../../../dictionary/ImMsgTypeDic.js"

let logOutResolve;

const state = {
	// NIM SDK 实例
	yxNim:undefined,
	yxLoginInfo: {
		// 登录账户ID
		yxUserUID:undefined,
		//token
		yxSdktoken:undefined,
	}
}

const getters = {
	yxNim(state) {
		return state.yxNim;
	},
	yxAccount(state) {
		return {
			"yxUserUID": state.yxUserUID,
			"yxSdktoken": state.yxSdktoken
		};
	}
}

const actions = {
	//初始化、登陆
	initNimSDK(context, loginInfo) {
		let {
			state,
			commit,
			dispatch
		} = context;
		let {
			uid,
			sdkToken
		} = loginInfo;

		return new Promise((resolve, reject) => {
			const nim = NIM.getInstance({
				debug: true,
				appKey: config.yxAppkey,
				account: uid,
				token: sdkToken,
				db: false,
				onconnect: function(event) {
					//连接成功
					commit("yxAccount", {
						"yxUserUID": uid,
						"yxSdktoken": sdkToken
					});

					commit("yxNim", nim);

					//更改imMain登陆状态
					commit('imMain/imLoginState', {
						"state": ImLoginState.LOGIN
					}, {
						root: true
					});
				},
				onsyncdone: function() {
					//同步完成
					resolve();
				},
				onerror: function(error) {
					//连接失败
					reject(error);
				},
				ondisconnect: function(error) {
					onDisconnect(commit, error)
				},
				onmyinfo: function(obj) {
					//用户信息更新
					onMyInfo(commit, obj);
				},
				onupdatemyinfo: function(obj) {
					//用户信息更新
					onMyInfo(commit, obj);
				},
				onroamingmsgs: function(obj) {
					//收到漫游消息
				},
				onofflinemsgs: function(obj) {
					//收到离线消息
				},
				onmsg: function onMsg(msg) {
					//收到消息
				}
			});
		});
	},
	//登出
	imYxLogOut(context) {
		let {
			state,
			commit,
			dispatch
		} = context;
		return new Promise((resolve, reject) => {
			logOutResolve = resolve;
			if (state.yxNim) {
				state.yxNim.disconnect();
			} else {
				reject("yxNim null");
			}
		});
	},
	//获取网易云历史记录
	imYxGetHistoryMsgs(context, params) {
		let {
			state,
			commit,
			dispatch
		} = context;
		let {
			//帐号
			to,
			beginTime,
			endTime,
			limit = 100
		} = params;
		
		if (beginTime === null) {
			beginTime = undefined;
		}
		if (endTime === null) {
			endTime = undefined;
		}
		return new Promise((resolve, reject) => {
			if (!state.yxNim) {
				reject("yxNim null");
			} else {
				state.yxNim.getHistoryMsgs({
					scene: "p2p",
					to,
					beginTime,
					endTime,
					limit,
					reverse: false,
					asc: true,
					done: function(error, value) {
						if (error) {
							reject(error);
						} else if (value && value.msgs instanceof Array) {
							//转换
							let newObj = {};
							let arrayObj = [];
							for (let index of value.msgs) {
								let obj = formatMsg(index);
								arrayObj.push(obj);
							}
							newObj.msgs = arrayObj;
							resolve(newObj);
						}
					}
				});
			}
		});
	}
}

//消息转换
function formatMsg(msg){
	let obj = {};
	if (!msg){
		return obj;
	}
	obj.id = msg.idServer;
	obj.flow = msg.flow;
	obj.from = msg.from;
	obj.fromNick = msg.fromNick;
	obj.to = msg.to;
	obj.time = msg.time;
	if (msg.type === "text"){
		obj.type = ImMsgTypeDic.TEXT;
		obj.custom = msg.text;
	}else if (msg.type === "image"){
		obj.type = ImMsgTypeDic.IMG;
		obj.custom = msg.file;
	}else if (msg.type === "audio"){
		obj.type = ImMsgTypeDic.AUDIO;
		obj.custom = msg.file;
	}else if (msg.type === "custom" && msg.content){
		obj.type = msg.content.type;
		obj.custom = msg.content.data;
	}
	//拓展字段内容
	obj.extra = msg.custom;
	return obj;
}

const mutations = {
	yxAccount(state, obj) {
		state.yxLoginInfo = obj;
	},
	yxNim(state, nim) {
		state.yxNim = nim;
	}
}

function onMyInfo(commit, obj) {
	//转换
	let myInfo = {};
	myInfo.account = obj.account;
	myInfo.name = obj.nick;
	myInfo.avatar = obj.avatar;
	myInfo.sex = obj.gender;
	myInfo.birth = obj.birth;
	myInfo.tel = obj.tel;
	//更改imMain用户信息状态状态
	commit('imMain/imMyInfo', myInfo, {
		root: true
	});
}

function onDisconnect(commit, error) {
	let loginState;
	if (logOutResolve) {
		logOutResolve();
		logOutResolve = null;
		loginState = {
			"state": ImLoginState.LOGOUT
		}
	} else {
		loginState = {
			"state": ImLoginState.KICK,
			"msg": err.from
		}
	}
	//更改imMain登陆状态
	commit('imMain/imLoginState', loginState, {
		root: true
	});
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
