import Vue from 'vue'
import Router from 'vue-router'
import topicWrapper from '@/components/topic/topic-wrapper'
import article from '@/components/article/article'
import sidebar from '@/components/sidebar/sidebar'
import user from '@/components/user/user'

Vue.use(Router)

export default new Router({
  // history模式没有#号
  mode: 'history',
  routes: [
    {
      path: '/',
      component: topicWrapper,
      props: (route) => ({ tab: route.query.tab, page: route.query.page })
    },
    {
      path: '/topic/:id',
      name: 'articleRoute',
      components: {
        article: article,
        sidebar: sidebar
      },
      props: {
        article: true, sidebar: false
      }
    },
    {
      // user前面不加斜杠刷新不会重新请求数据
      path: '/user/:loginname',
      name: 'userRoute',
      components: {
        user: user,
        sidebar: sidebar
      },
      props: {
        // 给sidebar传递数据判断是作者还是用户
        user: true, sidebar: true
      }
    }
  ]
})
