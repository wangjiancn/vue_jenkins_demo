import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { jwt: '' },
  getters: {
    user: (state, getters) => {
      if (getters.token.length < 1) return ''
      const payload = atob(getters.token.split('.')[1])
      const payload_json = JSON.parse(payload)
      return payload_json.data
    },
    token: state => {
      const jwt = state.jwt || localStorage.getItem('jwt') || ''
      if (jwt) {
        const payload = atob(jwt.split('.')[1])
        const payload_json = JSON.parse(payload)
        console.log(dayjs().format())
        let exp = null
        if (payload_json.exp.toString().length > 10) {
          exp = dayjs(payload_json.exp)
        } else {
          exp = dayjs.unix(payload_json.exp)
        }
        if (exp.diff(dayjs()) < 0) {
          console.log('过期')
          MessageBox.confirm('认证过期,请重新登录', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            store.commit('setJWT', '')
            location.reload()
          })
        }
      }
      return jwt
    },
  },
  mutations: {
    setJWT(state, token) {
      state.jwt = token
      localStorage.setItem('jwt', token || '')
      console.log('TCL: setJWT -> setJWT', token)
    },
  },
})

export default store
