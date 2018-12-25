import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import api from './api'


import Vant from 'vant'
import 'vant/lib/index.css'

import axios from './http.js'


Vue.prototype.$http = axios

Vue.prototype.$api = api


Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
