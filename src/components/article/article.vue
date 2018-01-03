<template>
  <!-- 文章页面 -->
  <!-- 必须等数据请求成功了再渲染否则会报错 -->
  <div v-if="loaded" class="article-container">
    <div class="header-container">
        <div class="title-container">
          <el-tag v-if="article.top||article.good" size="mini" :disable-transitions="true" class="tab">{{ article.top?"置顶":"精华"}}</el-tag>
          <h1 class="title">{{ article.title }}</h1>
        </div>
      <div class="article-detail">
        <span>发布于：{{ formatCreateDate }}</span>
        <span>作者：{{ article.author.loginname }}</span>
        <span>浏览：{{ article.visit_count }}</span>
        <span>来自：{{ translateTab }}</span>
      </div>
    </div>
    <div v-html="article.content" id="content"></div>
    <div class="reply-container">
      <span class="reply-count">{{ article.replies.length }} 回复</span>
      <div v-for="(reply, index) in article.replies" class="reply">
        <router-link :to="{name: 'userRoute', params: {loginname: reply.author.loginname }}">
          <img :src="reply.author.avatar_url" class="avatar">
          <span class="loginname">{{ reply.author.loginname }}</span>
        </router-link>
        <span>{{ index + 1 }}楼</span>
        <span>{{ reply.create_at | formatDate }}</span>
        <span v-if="article.author.loginname === reply.author.loginname" class="author">作者</span>
        <p v-html="reply.content" class="reply-content"></p>
        <div v-if="reply.ups.length" class="ups">
          <span class="icon-thumb-up"></span><span> {{ reply.ups.length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { formatDate } from '../../common/js/date'
  export default {
    props: {
      id: {
        type: String
      }
    },
    watch: {
      // 请求user数据
      article (val) {
        if (val.author.loginname !== this.$store.state.userInfo.loginname) {
          this.$store.dispatch('getUserInfo', {
            url: `https://cnodejs.org/api/v1/user/${val.author.loginname}`
          })
        }
      }
    },
    computed: {
      formatCreateDate () {
        return String(this.article.create_at).match(/\d{4}-\d+-\d+/)[0]
      },
      translateTab () {
        switch (this.article.tab) {
          case 'ask':
            return '问答'
          case 'share':
            return '分享'
          case 'good':
            return '精华'
          case 'job':
            return '招聘'
          default:
            return 'tabError'
        }
      },
      article () {
        if (this.$store.state.article.id !== this.id) {
          this.$store.dispatch('getArticle', {
            url: `https://cnodejs.org/api/v1/topic/${this.id}`
          })
        }
        return this.$store.state.article
      },
      loaded () {
        if (this.article.id) {
          return true
        }
        return false
      }
    },
    filters: {
      formatDate (value) {
        return formatDate(value)
      }
    }
  }
</script>
<style lang="scss" type="text/css">
  @import '../../../static/css/markdown-github.css';
  @import '../../common/sass/mixin';
  // v-html解析的元素视为子组件，需要去掉scoped元素样式才能起作用
  .article-container {
    // margin: 100px;
    max-width: 70%;
    background-color: #e1e1e1;
    .header-container {
      padding: 10px;
      border-radius: 3px 3px 0 0;
      background-color: #fff;
      .title-container {
        margin: 15px 0;
        .tab {
          vertical-align: top;
          @include tab;
        }
        .title {
          display: inline-block;
          font-weight: 700;
          font-size: 2.2rem;
        }
      }
      .article-detail {
        span {
          margin-right: 8px;
          color: #838383
        }
      }
    }
    #content {
      margin: auto;
      padding: 2rem 1rem 2rem 1rem;
      border-top: 1px solid #ddd;
      border-radius: 0 0 3px 3px;
      padding-bottom: 1rem;
      background: #fff;
    }
    .reply-container {
      margin-top: 10px;
      border-radius: 3px;
      background-color: #fff;
      .reply-count {
        display: block;
        padding: 1rem;
        border-radius: 3px 3px 0 0;
        line-height: 1.4rem;
        font-size: 1.4rem;
        color: #444;
        background-color: #f6f6f6;
      }
      .reply {
        position: relative;
        padding: 10px;
        border-bottom: 1px solid #e1e1e1;
        &:last-child {
          border-radius: 0 0 3px 3px;
        }
        .avatar {
          vertical-align: top;
          @include avatar(30px, 3px);
        }
        .loginname {
          margin-left: 10px;
          color: #666;
        }
        .author {
          display: inline-block;
          padding: 2px;
          background-color: #6ba44e;
          color: #fff
        }
        .reply-content {
          overflow: auto;
          margin: 0 30px 1.5rem 50px;
          font-size: 1.5rem;
          line-height: 2rem;
        }
        .ups {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 1.5rem;
          color: gray;
        }
      }
    }
  }

</style>