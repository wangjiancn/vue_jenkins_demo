import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import '@/styles/global.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import routes from './routes.js'
import store from '@/store'
import {
  Button,
  Select,
  Form,
  FormItem,
  Input,
  Option,
  Switch,
  Pagination,
  Notification,
  Loading,
  MessageBox,
  Message,
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

const components = [
  Button,
  Select,
  Form,
  FormItem,
  Input,
  Option,
  Switch,
  Pagination,
]

components.forEach(item => {
  Vue.component(item.name, item)
}) //直接使用.vue时，会自动弹出

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

Vue.use(Vuex)
Vue.use(VueRouter)
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
})

dayjs.extend(relativeTime)

Vue.directive('highlight', function(el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
})

Vue.prototype.$dayjs = dayjs

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})
