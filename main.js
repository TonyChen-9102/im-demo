import Vue from 'vue'
import App from './App'
import store from "./store/index.js"
import imSdk from "./thirdSdk/im-sdk/index.js"

Vue.config.productionTip = false
App.mpType = 'app'

//im-sdk
Vue.use(imSdk);

const app = new Vue({
	store,
    ...App
})
app.$mount()
