import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 挂载全局变量
Vue.prototype.serverUrl = "https://www.imovietrailer.com/superhero"

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
