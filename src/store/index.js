import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import { MessageBox } from 'element-ui'
import { get } from 'https'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { jwt: '', errors: {} },
  getters: {
    jwt: (state, getters) => {
      if (getters.token.length < 1) return ''
      const payload = atob(getters.token.split('.')[1])
      const payload_json = JSON.parse(payload)
      return payload_json
    },
    user: (state, getters) => {
      if (getters.jwt) {
        return getters.jwt.data
      } else {
        return ''
      }
    },
    auth: (state, getters) => {
      if (getters.jwt) {
        console.log('TCL: getters.jwt', getters.jwt)
        let exp = null
        if (getters.jwt.exp.toString().length > 10) {
          exp = dayjs(getters.jwt.exp)
        } else {
          exp = dayjs.unix(getters.jwt.exp)
        }
        if (exp.diff(dayjs()) < 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
    token: state => {
      const jwt = state.jwt || localStorage.getItem('jwt') || ''
      return jwt
    },
    errors: state => type => {
      return state.errors[type]
    },
  },
  mutations: {
    setJWT(state, token) {
      state.jwt = token
      localStorage.setItem('jwt', token || '')
    },
    resetJWT(state) {
      state.jwt = null
      localStorage.setItem('jwt', '')
    },
    setError(state, payload) {
      state.errors[payload.type] = payload.msg
    },
    removeError(state, payload) {
      delete state.errors[payload.type]
    },
  },
})

export default store
