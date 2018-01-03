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
      <a :href="github + userInfo.loginname" target="_blank">@{{ userInfo.loginname }}</a>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    props: {
      loginname: {
        type: String
      }
    },
    data () {
      return {
        isfixed: false
      }
    },
    created () {
      window.addEventListener('scroll', this.handleScroll)
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      },
      loaded () {
        if (this.userInfo.loginname) {
          return true
        }
        return false
      },
      ...mapGetters({
        github: 'getGithub'
      })
    },
    methods: {
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