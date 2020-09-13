import Vue from "vue";
import Vuex from "vuex"

import imMain from "../thirdSdk/im-sdk/store/modules/im/imMain.js"
import imYXMain from "../thirdSdk/im-sdk/store/modules/im/yunxin/imYXMain.js"

Vue.use(Vuex);

const store  = new Vuex.Store({
	modules:{
		imMain,
		imYXMain
	}
});

export default store;


