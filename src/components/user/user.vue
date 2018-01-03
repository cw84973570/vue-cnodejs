<template>
  <div v-if="loaded" class="user-container">
    <div class="info-wrapper">
      <div class="header">
        <router-link to="/" class="home">主页</router-link>
      </div>
      <div class="info-inner">
        <img :src="userInfo.avatar_url" class="avatar">
        <span class="loginname">{{ userInfo.loginname }}</span>
        <div class="score">
          <span>{{ userInfo.score }} 积分</span>
        </div>
        <div class="github">
          <span class="icon-github"></span>
          <a :href="github + userInfo.loginname" target="_blank">@{{ userInfo.loginname }}</a>
        </div>
        <span class="login-date">注册时间 {{ userInfo.create_at | formatDate }}</span>
      </div>
    </div>
    <div class="topic-wrapper">
      <div class="header">
        <span>最近创建的话题</span>
      </div>
      <div v-for="(topic, index) in userInfo.recent_topics" class="topic">
        <router-link :to="{name: 'userRoute', params: { loginname: topic.author.loginname }}">
          <img :src="topic.author.avatar_url" class="avatar">
        </router-link>
        <router-link :to="{name: 'articleRoute', params: { id: topic.id }}" class="title">{{ topic.title }}</router-link>
      </div>
    </div>
    <div class="topic-wrapper">
      <div class="header">
        <span>最近参与的话题</span>
      </div>
      <div v-for="(topic, index) in userInfo.recent_replies" class="topic">
        <router-link :to="{name: 'userRoute', params: { loginname: topic.author.loginname }}">
          <img :src="topic.author.avatar_url" class="avatar">
        </router-link>
        <router-link :to="{name: 'articleRoute', params: { id: topic.id }}" class="title">{{ topic.title }}</router-link>
      </div>
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
    computed: {
      userInfo () {
        if (this.$store.state.userInfo.loginname !== this.loginname) {
          this.$store.dispatch('getUserInfo', {
            url: `https://cnodejs.org/api/v1/user/${this.loginname}`
          })
        }
        return this.$store.state.userInfo
      },
      loaded () {
        if (this.userInfo.loginname) {
          return true
        }
        return false
      },
      // mapGetters辅助函数
      ...mapGetters({
        github: 'getGithub'
      })
    },
    filters: {
      formatDate (value) {
        return value.match(/\d+-\d+-\d+/)[0]
      }
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../common/sass/mixin';

  .user-container {
    max-width: 70%;
    .info-wrapper {
      margin-bottom: 10px;
      border-radius: 3px;
      background-color: #fff;
      .header {
        padding: 10px;
        border-radius: 3px 3px 0 0;
        background-color: #f6f6f6;
        border-bottom: 1px solid #e5e5e5;
        .home {
          color: #80bd01;
          font-size: 1.4rem;
        }
      }
      .info-inner {
        padding: 10px;
        font-size: 1.4rem;
        .avatar {
          vertical-align: top;
          @include avatar(40px, 3px);
        }
        .loginname {
          margin-left: 5px;
          line-height: 1.4rem;
          color: #778087;
        }
        .score {
          margin: 20px 0 10px;
        }
        .github {
          color: #7e8c8d;
          margin: 10px 0;
        }
        .login-date {
          display: block;
          padding: 10px 0;
        }
      }
    }
    .topic-wrapper {
      margin-bottom: 10px;
      background-color: #fff;
      border-radius: 3px;
      .header {
        padding: 10px;
        border-radius: 3px 3px 0 0;
        background-color: #f6f6f6;
        font-size: 1.4rem;
      }
      .topic {
        padding: 10px;
        border-bottom: 1px solid #f0f0f0;
        &:last-child {
          border-radius: 0 0 3px 3px;
        }
        .avatar {
          vertical-align: middle;
          @include avatar(30px, 3px);
        }
        .title {
          margin-left: 10px;
          font-size: 1.6rem;
          color: #08c;
          &:hover {
            text-decoration: underline;
            color: #005580;
          }
        }
      }
    }
  }
</style>