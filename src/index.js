import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import routes from './routes.js'
import store from '@/store'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(VueRouter)
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
})

dayjs.extend(relativeTime)

Vue.prototype.$dayjs = dayjs

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
