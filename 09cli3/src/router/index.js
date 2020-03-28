import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import First from '../components/first.vue'
import A from '../components/A.vue'
import B from '../components/B.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: First,
		children: [{
				path: '/a',
				component: A
			},
			{
				path: '/b',
				component: B
			}
		]
	}

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
