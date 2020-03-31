import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入需要路由管理的组件
import Discover from './components/Discovery.vue'
import List from './components/List.vue'
import Latest from './components/Latest.vue'
import Mv from './components/Mv.vue'
import Result from './components/Result.vue'
let router = new VueRouter({
	routes:[
		{
			path:'/discover',
			component:Discover
		},
		{
			path:'/list',
			component:List
		},
		{
			path:'/latest',
			component:Latest
		},
		{
			path:'/mv',
			component:Mv
		},
		{
			path:'/result',
			component:Result
		}
	]
})

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUi)
new Vue({
  render: h => h(App),
  router //挂载到vue实例上 是router:router的缩写
}).$mount('#app')
