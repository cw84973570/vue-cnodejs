import * as types from './mutation-types' // 将导出的属性作为types对象的属性导入

export const mutations = {
  [types.GET_TOPICS] (state, response) {
    state.topics = response.data.data
  },
  [types.GET_ARTICLE] (state, response) {
    state.article = response.data.data
  },
  // 不能给response加大括号
  [types.GET_USERINFO] (state, response) {
    state.userInfo = response.data.data
  }
}
