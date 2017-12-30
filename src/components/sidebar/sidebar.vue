<template>
  <!-- 侧边栏 -->
  <div class="sidebar-container" v-if="loaded" :class="{ fixed: isfixed }">
    <div class="header">
      <span v-if="loginname">用户信息</span>
      <span v-else>作者</span>
    </div>
    <router-link :to="{name: 'userRoute', params: { loginname: userInfo.loginname }}">
      <img :src="userInfo.avatar_url"class="avatar">
      <span class="loginname">{{ userInfo.loginname }}</span>
    </router-link>
    <div class="score">
      <span>积分：{{ userInfo.score }}</span>
    </div>
    <div class="github">
      <span class="icon-github"></span>
      <a :href="github + userInfo.loginname">@{{ userInfo.loginname }}</a>
    </div>
  </div>
</template>
<script>
  // 由于先做的article和sidebar组件，所以一开始设计为article和sidebar分别请求数据，由于article的sidebar并不是根据路由参数请求数据，造成了sidebar路由和数据的混乱，并不知道如何理清楚，经过长时间(一下午)的摸索和思考后改成了由article和user组件请求数据，然后将数据通过emit发送给sidebar
  import bus from '../../common/js/bus'
  export default {
    props: {
      loginname: {
        type: String
      }
    },
    data () {
      return {
        userInfo: {},
        loaded: false,
        github: 'https://github.com/',
        isfixed: false
      }
    },
    created () {
      // 注册传递信息事件，获取文章组件的作者信息
      bus.$on('user', this.getUsername)
      window.addEventListener('scroll', this.handleScroll)
    },
    watch: {
      userInfo (val) {
        this.loaded = true
      }
    },
    beforeDestroy () {
      // 最好在组件销毁前注销事件
      bus.$off('user', this.getUsername)
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      getUsername (userInfo) {
        this.userInfo = userInfo
      },
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 90) {
          this.isfixed = true
        } else {
          this.isfixed = false
        }
      }
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../common/sass/mixin';
  .sidebar-container {
    width: 25%;
    position: absolute;
    left: 70%;
    margin-left: 10px;
    overflow: auto;
    border-radius: 3px;
    background-color: #fff;
    // sidebar固定在视口顶部，不随页面滚动而滚动
    &.fixed {
      position: fixed;
      top: 20px;
      left: 70%;
    }
    .header {
        padding: 10px;
        background-color: #f6f6f6;
        font-size: 2.8rem;
    }
    .avatar {
      margin: 10px;
      vertical-align: middle;
      @include avatar(48px, 3px);
    }
    .loginname {
      display: inline-block;
      color: #778087;
      line-height: 3.2rem;
      font-size: 3.2rem;
    }
    .score {
      padding: 10px 10px;
      line-height: 2.8rem;
      font-size: 2.8rem;
    }
    .github {
      color: #7e8c8d;
      padding: 10px;
      line-height: 2.8rem;
      font-size: 2.8rem;
    }
  }
</style>