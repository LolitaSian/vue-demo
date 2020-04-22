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
	name: 'app',
	components:{
		top,  //top:top
		index
	}
}
</script>

<style>
	@import url("./assets/index.css");
</style>
