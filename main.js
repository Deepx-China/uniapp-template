import App from './App'
import Util from './utils/index.js'
import Api from './server/api.js'
Vue.prototype.api = Api
Vue.prototype.http = Util
Vue.prototype.util = Util
Vue.prototype.jump = Util.jump

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif