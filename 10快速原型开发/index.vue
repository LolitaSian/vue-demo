<template>
	<div>
		<section class="main" v-cloak>
			<header>
				<p>
					<strong>
						<img src="./05.png" />
						巴拉预报
					</strong>
				</p>
				<div id="is">
					<input type="text" v-model="city" class="ipt" autofocus="autofocus" @keyup.enter="schWeather" />
					<input type="button" class="search" value="搜索" @click="schWeather" />
				</div>

				<div id="ci">
					<a href="javascript:;" @click="changeCity('北京')">北京</a>
					<a href="javascript:;" @click="changeCity('济南')">济南</a>
					<a href="javascript:;" @click="changeCity('呼和浩特')">呼和浩特</a>
					<a href="javascript:;" @click="changeCity('烟台')">烟台</a>
				</div>
			</header>
			<footer v-show="tips != ''">
				<p id="title">
					<span class="fore">未来五日预报</span>
					<span class="yest">昨日天气</span>
				</p>
				<ul>
					<li v-for="(item, index) in forcast" :key="index">
						<p class="we">{{ item.type }}</p>
						<p class="tem">{{ item.low }}~{{ item.high }}</p>
						<p class="fx">{{ item.fengxiang }}</p>
						<p class="da">{{ item.date }}</p>
					</li>
				</ul>
				<p class="tips">温馨提示：{{ tips }}</p>
			</footer>
		</section>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			city: '',
			forcast: [],
			tips: ''
		};
	},
	methods: {
		schWeather: function() {
			// 保存this
			var that = this;
			axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city).then(function(response) {
				console.log(response.data.data);
				that.forcast = response.data.data.forecast;
				that.forcast.push(response.data.data.yesterday);
				that.tips = response.data.data.ganmao;
			});
		},
		changeCity: function(city) {
			this.city = city;
			this.schWeather();
		}
	}
};
</script>

<style>
@import url('./10.css');
</style>
