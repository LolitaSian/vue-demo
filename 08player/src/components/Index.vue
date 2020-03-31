<template>
  <div class="index-container">
    <div class="nav" >
      <ul>
        <li>
          <router-link to="/discover">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/list">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/latest">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mv">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio :src='musicUrl' controls autoplay="autoplay"></audio>
    </div>
  </div>
</template>

<script>
	import discover from './Discovery.vue'
	import list from './List.vue'
	import latest from './Latest.vue'
	import mv from './Mv.vue'
	import result from './Result.vue'
export default {
	components:{
		discover,
		list,
		latest,
		mv,
		result
	},
  name: 'index',
  data() {
    return {
      musicUrl:""
    };
  }
};
</script>

<style >

</style>
