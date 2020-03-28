<template>
	<div>
		<router-link to="/a">转向A</router-link>
		<br />
		<router-link to="/b">转向B</router-link>
		<router-view></router-view>	<!-- //挂载点 -->
	</div>
</template>
<style>
	@import url("../../public/09.css");
</style>