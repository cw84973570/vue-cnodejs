import Vue from 'vue'
import Vuex from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

Vue.use(Vuex)

// Vuex中的状态，相当于Vue中的data
const state = {
  topics: [], // 首页的文章主题
  userInfo: {}, // 用户信息
  article: {}, // 文章信息
  github: 'https://github.com/'

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
