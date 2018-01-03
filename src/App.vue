<template>
  <div id="app">
    <div class="header">
      <router-link to="/" class="home">
        <img src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg">
      </router-link>
    </div>
    <div class='main'>
      <router-view></router-view>
      <router-view  name="sidebar"></router-view>
      <router-view  name="article"></router-view>
      <router-view name='user'></router-view>
    </div>
  </div>
</template>
<script>
export default {
  // name属性允许递归自身，并且便于调试，在vue-devtools中获得更有语义的组件树，
  // 现在貌似没有name属性的组件会被命名为文件名称。
  name: 'app'
}
</script>
<style lang="scss" scoped="" type="text/css">
  .header {
    position: relative;
    line-height: 50px;
    height: 50px;
    background-color: #444;
    .home {
      display: inline-block;
      // 设置垂直居中
      position: absolute;
      left: 50px;
      top: 0;
      bottom: 0;
      height: 30px;
      width: 120px;
      margin: auto 0;
      line-height: 30px;
    }
  }
  .main {
      padding: 20px;
      background-color: #e1e1e1;
    }
</style>
