# 写个小笔记？:slightly_smiling_face:

### 创建项目

`vue init webpack 项目名`

- ? Project name ：项目名
- ? Project description ：描述
- ? Author：作者
- ? Vue build：回车默认 standalone
- ? Install vue-router? ：回车默认Yes
- ? Use ESLint to lint your code? ：<font color=red>输入No</font>
- ? Set up unit tests ：回车默认yes
- ? Pick a test runner ：回车默认jest
- ? Setup e2e tests with Nightwatch? ：回车默认Yes
- ? Should we run npm install for you after the project has been created? (recommended) ：回车默认npm

`npm run dev`执行



### 页面跳转和子路由

建好项目之后，进入目录的`src-->component`在这个文件夹中新建.vue的文件。

然后去`src-->router`文件夹下打开index.js

将文件引入：`import 变量名 from '@/components/文件名(.vue写不写都行)`

- 变量名默认大写
- 文件名就是你新建的文件的名字

```javascript
 routes: [{
      path: '/',   		 // “/”代表根页面
	  name:   ,
      component:变量名		//
    }
```

打开新建的文件

```html
<template>
  <div>
      template中一定要加一个div再写其他的东西
  </div>
</template>
```

------

根页面

```vue
<template>
  <div>
    <router-link to="/father">我是父页面1father</router-link>
  </div>
</template>
```

根页面跳转到一级页面

```vue
<template>
  <div>
    <p>我是父页面father</p>
    <p>
        <router-link to="/children">转向子页面</router-link> 
    </p>
    <p><router-link to="/">返回</router-link> </p> //返回根
    <router-view></router-view> //一定要写挂载点
  </div>
</template>
```

子页面

```vue
<template>
  <div>
    <p>我是子页面children</p>
    <p><router-link to="/father">返回上一级</router-link> </p>
    <p><router-link to="/">返回首页</router-link></p>
  </div>
</template>
```

index.js页面中：

```js
//实现无覆盖和完全覆盖
      {
          path: '/',
          component: MyFirstVue
      },
      {
          path: '/father',
          component: Father, //component就是上边写的变量名
          children: [ //写进来，点击时候子页面不会覆盖前面的内容
              {
                  path: '/children1',
                  component: Children1
              }
          ]
      },
      { //并列写 只显示子页面的内容
          path: '/children2',
          component: Children2
      }
```

```js
//保留根页面内容，覆盖只会覆盖父页面，不会覆盖根页面内容
routes: [{
    path: '/',
    component: MyFirstVue,
    children: [{
        path: '/father',
        component: Father, 
        children: [ 
          {
            path: '/children1',
            component: Children1
          }
        ]
      },
      { 
        path: '/children2',
        component: Children2
      }
    ]
```

### 修改路由模式

地址栏里的#是什么`http://localhost:8081/#/`

路由的两种显示模式

1. hash模式：地址栏包含#，减少到后台数据库访问的次数。当地址栏内容没有发生改变，浏览器不会发出请求给后台，可以减少后台、数据库的访问次数。#以后的内容不会被请求所获取，#后面的内容不论怎么变化都不会被http所获取，页面不会被重新加载，减少对后台访问次数。
2. history模式：对url的历史记录进行修改，也是为了减少对后台的访问次数，使http不会反复向后台发出请求。利用h5的新功能。但是再刷新或者页面不存在的时候会404，而#的时候页面不存在只是点了没反应而已。

修改#为history模式：

```js
export default new Router({
  mode:"history",			//添加这行即可
  routes: [
    {
      path: '/',
      component: hello
    }
  ]
})
```

