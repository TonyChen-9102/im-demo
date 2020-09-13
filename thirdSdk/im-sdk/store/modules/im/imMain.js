import ImTypeDic from "../../../dictionary/ImTypeDic.js"
import config from "../../../config/index.js"
import ImLoginState from "../../../dictionary/ImLoginState.js"

const state = {
	//登陆状态
	imLoginState: {
		"state": ImLoginState.LOGOUT,
		"msg": undefined,
	},
	// 用户信息
	imMyInfo: {
		"account": undefined,
		"name": undefined,
		"avatar": undefined,
		"sex": undefined,
		"birth": undefined,
		"tel": undefined
	},
}

const getters = {
	imLoginState(state) {
		return start.imLoginState;
	},
	imMyInfo(state) {
		return start.imMyInfo;
	}
}

const actions = {
	//初始化和登陆
	imLogin({
		dispatch
	}, loginInfo) {
		return new Promise(async (resolve, reject) => {
			if (config.imType == ImTypeDic.YUN_XIN) {
				try {
					await dispatch('imYXMain/initNimSDK', loginInfo, {
						root: true
					});
					resolve();
				} catch (e) {
					reject(e);
				}
			} else {
				reject("imType unknow");
			}
		});
	},
	//登出
	imLogOut({
		dispatch
	}) {
		return new Promise(async (resolve, reject) => {
			if (config.imType == ImTypeDic.YUN_XIN) {
				try {
					await dispatch('imYXMain/imYxLogOut', {}, {
						root: true
					});
					resolve();
				} catch (e) {
					reject(e);
				}
			} else {
				reject("imType unknow");
			}
		});
	},
	/**
	 * 获取云端就诊记录
	 */
	imGetHistoryMsgs(context, params) {
		let {
			state,
			commit,
			dispatch
		} = context;
		let {
			to,
			beginTime,
			endTime,
			buzId
		} = params;

		return new Promise(async (resolve, reject) => {
			if (config.imType == ImTypeDic.YUN_XIN) {
				let beginMsgTime = undefined;
				if (beginTime) {
					//beginTime需要向前5分钟
					beginMsgTime = beginTime - 5 * 60 * 1000;
				}
				let lastMsgTime = endTime;
				let i = 99;
				while (i > 0) {
					i--;
					//根据buzId筛选，原本有值，筛选后无值，则循环，直到筛选有值或者原本无值停止
					try {
						let value = await dispatch('imYXMain/imYxGetHistoryMsgs', {
							to,
							beginTime: beginMsgTime,
							endTime: lastMsgTime,
						}, {
							root: true
						});
						console.log("ckd params=" + JSON.stringify(params));
						console.log("ckd msgObj=" + JSON.stringify(value));
						let array = [];
						if (value && value.msgs instanceof Array && value.msgs.length > 0 && false) { //TODO ckd
							lastMsgTime = value.msgs[0].time;
							for (let index of value.msgs) {
								if (index.extra && index.extra.buzId === buzId) {
									array.push(index);
								}
							}
						} else {
							resolve(value);
							return;
						}
						if (array.length > 0) {
							value.msgs = array;
							resolve(value);
							return;
						}
					} catch (e) {
						reject(e);
						return;
					}
				}
				resolve({});
			} else {
				reject("imType unknow");
			}
		});
	}
}

const mutations = {
	imLoginState(state, payload) {
		state.imLoginState = payload;
	},
	imMyInfo(state, payload) {
		state.imMyInfo = payload;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
