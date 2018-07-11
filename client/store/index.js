import Vuex from 'vuex'
// import api from '~/assets/api/api'

var cookieparser = require('cookieparser')
var jwtDecode = require('jwt-decode')

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: {
        id: null,
        token: null,
        role: null
      }
    },
    mutations: {
      updateToken (state, payload) {
        state.auth.token = payload
      },
      updateRole (state, payload) {
        state.auth.role = payload
      },
      updateUsername (state, payload) {
        state.auth.username = payload
      },
      updateId (state, payload) {
        state.auth.id = payload
      },
      logout (state) {
        state.auth.id = null
        state.auth.token = null
      }
    },
    actions: {
      async nuxtServerInit ({ commit }, { req }) {
        let accessToken = null
        let userId = null
        let role = null
    
        // If cookies
        if (req.headers.cookie) {
            let parsed = cookieparser.parse(req.headers.cookie)
            accessToken = parsed.auth
            userId = jwtDecode(accessToken).userId
            role = parsed.role
        }

        commit('updateToken', accessToken)
        commit('updateRole', role)
        commit('updateId', userId)
      }
    }
  })
}

export default createStore