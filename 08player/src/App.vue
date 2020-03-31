<template>
	<div>
		<top></top>
		<index></index>
	</div>
</template>

<script>
//导入
import top from './components/Top.vue'
import index from './components/Index.vue'
export default {
	// 注册
	components:{
		top,  //top:top
		index
	},
	methods:{
		
	}
}
</script>

<style>
	@import url("./assets/reset.css");
	@import url("./assets/index.css");
</style>
