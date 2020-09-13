import uView from "./components/uview-ui/index.js"
import config from "./config/index.js"
import MescrollBody from "./components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "./components/mescroll-uni/mescroll-uni.vue"

export default {
	install: function(Vue) {
		// uView
		Vue.use(uView);
		//mescroll-uni
		Vue.component('im-mescroll-body', MescrollBody);
		Vue.component('im-mescroll-uni', MescrollUni);
		
		Vue.prototype.$imConfig = config
	}
}
