<template>
  <!-- 主题页面 -->
  <div class="topic-wrapper">
    <div class="tabs-wrapper">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="精华" name="good"></el-tab-pane>
        <el-tab-pane label="分享" name="share"></el-tab-pane>
        <el-tab-pane label="问答" name="ask"></el-tab-pane>
        <el-tab-pane label="招聘" name="job"></el-tab-pane>
      </el-tabs>
    </div>
    <topic :topics="topics"></topic>
    <el-pagination layout="prev, pager, next":total="1010" @current-change="handleCurrentChange"
    :current-page.sync="activePage"></el-pagination>
  </div>
</template>
<script>
  import topic from '../topic/topic.vue'
  export default {
    props: {
      tab: {
        default: 'all'
      },
      page: {
        default: 1
      }
    },
    data () {
      return {
        activeName: 'all',
        activePage: 1,
        clickPage: true
      }
    },
    watch: {
      // 同beforeRouteUpdate守卫
      '$route' (to, from) {
        this.activeName = this.tab
        this.activePage = this.page
        this.getTopics()
        // 当页面参数不存在时将clickPage设置为false
        if (!to.query.page) {
          this.clickPage = false
        } else {
          this.clickPage = true
        }
      }
    },
    created () {
      this.activeName = this.tab
      this.activePage = parseInt(this.page)
      this.getTopics()
    },
    computed: {
      topics () {
        return this.$store.state.topics
      }
    },
    methods: {
      // 页码变化调用
      handleCurrentChange (val) {
        if (this.clickPage || val !== 1) {
          this.currentPage = val
          this.$router.push({ path: '/', query: { tab: this.activeName, page: val } })
        }
      },
      // 切换标签调用
      handleClick (tab) {
        this.$router.push({ path: '/', query: { tab: `${tab.name}` } })
      },
      getTopics () {
        this.$store.dispatch('getTopics', {
          url: 'https://cnodejs.org/api/v1/topics/',
          params: {
            tab: this.activeName,
            page: this.activePage,
            limit: 40
          }
        })
      }
    },
    components: { topic }
  }
</script>
<style lang="scss" scoped="" type="text/css">
  .topic-wrapper {
    padding-top: 0;
    background-color: #fff;
    max-width: 1200px;
    margin: auto;
    border-radius: 5px;
    .tabs-wrapper {
      margin: 0 20px;
    }
  }
</style>