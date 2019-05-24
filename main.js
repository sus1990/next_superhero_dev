import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 挂载全局变量
Vue.prototype.serverUrl = "https://www.imovietrailer.com/superhero";

//挂载全局的方法，判断用户是否登录
Vue.prototype.getGlobalUser = function(key) {
	var userInfo = uni.getStorageSync(key);
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	} else {
		return null;
	}
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
