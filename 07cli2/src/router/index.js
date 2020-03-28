import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyFirstVue from '@/components/myFirstVue'
import Father from '@/components/1father'
import Children1 from '@/components/1children1'
import Children2 from '@/components/1children2.vue'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [{
    path: '/',
    component: MyFirstVue,
    children: [{
        path: '/father',
        component: Father, //component就是上边写的大写的名字
        children: [ //写进来就是无覆盖
          {
            path: '/children1',
            component: Children1
          }
        ]
      },
      { //并列写 子页面就会覆盖父页面的内容
        path: '/children2',
        component: Children2
      }
    ]
  }]
})
