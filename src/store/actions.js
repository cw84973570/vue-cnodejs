import * as types from './mutation-types'
import { getData } from '../api/getData'

export const actions = {
  getTopics (context, payload) {
    getData(
      payload.url,
      payload.params
    ).then(response => {
      context.commit(types.GET_TOPICS, response)
    })
  },
  // 参数解构简化context
  getArticle ({ commit }, payload) {
    getData(payload.url, payload.params).then(
      response => {
        commit(types.GET_ARTICLE, response)
      })
  },
  getUserInfo ({ commit }, payload) {
    getData(payload.url, payload.params).then(
      response => {
        commit(types.GET_USERINFO, response)
      })
  }
}
