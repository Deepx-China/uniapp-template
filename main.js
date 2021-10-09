import Vue from 'vue'
import App from './App'
import Utils from 'utils/index.js'
import Cache from 'utils/cache.js'
import CityUtil from './utils/city.js'
import * as RequestUtil from './utils/request.js'
import Api from './utils/apis.js'
import DateUtil from 'utils/date.js'
import UserUtil from 'utils/user.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.api = Api
Vue.prototype.http = RequestUtil
Vue.prototype.util = Utils
Vue.prototype.jump = Utils.jump
Vue.prototype.jumpTab = Utils.jumpTab
Vue.prototype.cache = Cache
Vue.prototype.cityUtil = CityUtil
Vue.prototype.date = DateUtil
Vue.prototype.user = UserUtil

const app = new Vue({
    ...App
})
app.$mount()

