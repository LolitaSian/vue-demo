window.onload = function(){
	var app = new Vue({
		el:"#main",
		data:{
			city:"",
			forcast:[],
			tips:""
		},
		methods:{
			schWeather:function(){
				// 保存this
				var that = this;
				axios.get("http://wthrcdn.etouch.cn/weather_mini?city="+this.city)
				.then(function(response){
					console.log(response.data.data);
					that.forcast = response.data.data.forecast;
					that.forcast.push(response.data.data.yesterday);
					that.tips = response.data.data.ganmao;
				})
			},
			changeCity:function(city){
				this.city = city;
				this.schWeather();
			}
		}
	})
}