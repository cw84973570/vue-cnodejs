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
        topics: [],
        clickPage: true
      }
    },
    // 一开始通过页面和标签事件请求数据，后来发现前进后退或者输入url会有页面不跳转的bug，
    // 改成由路由守卫请求数据不仅决解了bug还用很简单的逻辑完成了之前的代码，大大提成了性能
    watch: {
      // 同beforeRouteUpdate守卫
      '$route' (to, from) {
        this.activeName = to.query.tab ? to.query.tab : 'all'
        this.activePage = to.query.page ? parseInt(to.query.page) : 1
        this.getData(this.activeName, this.activePage)
        // 当页面参数不存在时将clickPage设置为false
        if (!to.query.page) {
          this.clickPage = false
        } else {
          this.clickPage = true
        }
      }
    },
    // 刷新或者输入url时调用，因为beforeRouteEnter不能使用this，无法初始化activeName
    // 和activePage，所以只能通过路由传参进来并由created钩子调用相应的代码
    created () {
      this.getData(this.tab, this.page)
      this.activeName = this.tab
      this.activePage = parseInt(this.page)
    },
    // 当从页码大于1的页面切换到其他标签时，会导致页码变为1，会先调用标签变化函数再调用页码
    // 变化函数，导致请求两次数据并且url请求参数的设置也不正确。解决办法是加上一个pageQuery
    // 判断条件，当标签没变也就是pageQuery为false或者目标页面不为1时才调用页码变化函数，换句话说
    // 就是点击页码时才调用函数而不是页码发生变化时。
    methods: {
      // 页码变化调用
      handleCurrentChange (val) {
        // 当页码参数存在或者目标页码大于1时执行
        // 由于切换标签或者进入主页导致页码变化时不执行，也就是只有点击页码栏才执行
        if (this.clickPage) {
          this.currentPage = val
          this.$router.push({ path: '/', query: { tab: this.activeName, page: val } })
          // this.clickPage = true
        }
      },
      // 切换标签调用
      handleClick (tab) {
        this.$router.push({ path: '/', query: { tab: `${tab.name}` } })
      },
      getData (tab, page) {
        this.$http({
          url: 'https://cnodejs.org/api/v1/topics/',
          method: 'get',
          params: {
            tab: tab,
            page: page,
            limit: 40
          }
        }).then(response => {
          this.topics = response.data.data
        }).catch(error => {
          console.log(error)
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