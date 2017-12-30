<template>
  <div>
    <div v-for="topic in topics" class="topic">
      <!-- 需要绑定src -->
      <router-link :to="{name: 'userRoute', params: { loginname: topic.author.loginname }}">
        <img :src="topic.author.avatar_url" class="avatar">
      </router-link>
      <div class="count-wrapper">
        <span class="reply-count">{{ topic.reply_count }}</span>
        <span class="reply-separator">/</span>
        <span class="visit-count">{{ topic.visit_count }}</span>
      </div>
      <el-tag v-if="topic.top||topic.good" size="mini" :disable-transitions="true" class="tag">{{ topic.top?"置顶":"精华"}}</el-tag>
      <!-- 跳转到带id的路由必须指定name才能跳转，请求参数同理 -->
      <router-link :to="{name: 'articleRoute', params: { id: topic.id }}" class="title">{{ topic.title }}</router-link>
      <span class="last-reply">最后回复：{{ topic.last_reply_at | formatDate }}</span>
    </div>
  </div>
</template>
<script>
  import { formatDate } from '../../common/js/date'
  export default {
    props: {
      topics: {
        type: Array
      }
    },
    filters: {
      formatDate: function (value) {
        return formatDate(value)
      }
    }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../../common/sass/mixin';
  .topic {
    position: relative;
    line-height: 2.8rem;
    padding: 10px;
    border-top: 1px solid #f0f0f0;
    font-size: 0;
    .avatar {
      vertical-align: middle;
      line-height: 2.8rem;
      @include avatar(30px, 3px);
    }
    .tag {
      vertical-align: middle;
      @include tab;
    }
    .title {
      width: 70%;
      display: inline-block;
      vertical-align: middle;
      // 文本超出部分用省略号代替，需要指定width
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.4rem;
      height: 1.4rem;
      font-size: 1.4rem;
      color: #000;
    }
    .count-wrapper {
      display: inline-block;
      vertical-align: middle;
      line-height: 2rem;
      width: 75px;
      text-align: center;
      .reply-count {
        color: #9e78c0;
        font-size: 1.4rem;
      }
      .reply-separator {
        font-size: 1rem;
      }
      .visit-count {
        color: #b4b4b4;
        font-size: 1rem;
      }
    }
    .last-reply {
      display: inline-block;      
      position: absolute;
      right: 10px;
      color: #778087;
      // 垂直居中
      height: 2.8rem;
      line-height: 2.8rem;
      text-align: center;
      font-size: 1.2rem;
    }
  }
</style>