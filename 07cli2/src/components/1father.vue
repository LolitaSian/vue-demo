<template>
  <div>
    <p>我是父页面1father</p>
    <p><router-link to="/children1">转向无覆盖子页面1</router-link> </p>
    <p><router-link to="/children2">转向覆盖子页面2</router-link> </p>
    <p><router-link to="/">返回</router-link> </p>
    <router-view></router-view>
    <!-- 子路由方式会连同父页面一起显示出来，适合父子关系的页面 -->
  </div>
</template>

<script>
</script>

<style>
</style>
