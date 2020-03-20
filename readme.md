# 写个小笔记？:slightly_smiling_face:

## 基础语法

API：https://cn.vuejs.org/v2/api

`var 变量名 = new Vue`声明Vue实例

`el:`挂载点，默认是id选择器，其实其他的css选择器也可以用，但是建议使用id选择器

`data`数据

`methods`方法，通过this指针可以获取到data的数据

vue会管理`el`命中的元素及其内部的子元素。

可是使用除了`<body> <html>`以外的所有双标签。

```vue
		<div id="app">
			{{ haha }}
			<p>
				{{ "obj.name = " + obj.name }}
				<br />
				<span>{{"arr[0] = " + array[0]}}</span>
			</p>
		</div>

		<script>
			var app = new Vue({
				el: '#app', //el:挂载点
				data: {
					haha: 'Hell0 Vue!',
					array: ["hello", "world", "sian"],
					obj: {
						name: "sian",
						age: 23
					}
				}
			})
		</script>
```

### Vue指令

####  `v-cloak`

这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。就是解决页面刷新和页面加载会出现插值表达式的问题。

```css
/*在css中加上这段，注意css要是link引入的*/
[v-cloak] {
  display: none;
}
```

```html
<!--在html挂载元素上加上这个-->
<div v-cloak>
  {{ message }}
</div>
```

#### `v-text` 

设置标签的内容（textContent）与`{{}}`插值表达式相比，插值表达式不会影响标签中原来的内容，但是`v-text` 会完全替换标签内容。两个都可以使用表达式，例如：

`{{ message + "hahaha"}}`

 `{{v-text = "message + 'hahaha'"}}`

```html
		<div id="test1">					//输出 haha Hello Vue!
			haha {{ haha }}
		</div>
		<div id="test2" v-text="haha">		//输出 Hello Vue!
			haha
		</div>

	<script>
			var app1 = new Vue({
				el: '#test1', 
				data: {
					haha: 'Hello Vue!',
				}
			})
			var app2 = new Vue({
				el: '#test2', 
				data: {
					haha: 'Hello Vue!',
				}
			})
	</script>
        
```
#### `v-html`

设置元素的innerHTML。普通文本显示效果和`v-text` 一样，凡是如果内容中有HTML结构会被解析为标签。

```html
	<div id="test1" v-html="message"></div>
	<div id="test2" v-text="message"></div>
	<script>
        	var app1 = new Vue({
				el: '#test1', 
				data: {
					message: "<h1>hello</h1>"
				}
			})
			var app2 = new Vue({
				el: '#test2', 
				data: {
					message: "<h1>hello</h1>"
				}
			})
	</script>
```
#### `v-show` `v-if`

前者根据元素的真假切换元素的显示状态，实际是修改display的值。

后者根据元素的真假切换元素的显示状态，实际是操作dom树。

操作频繁的多使用`v-show`

```html
		<div id="app">
			<img src="demo/build/logo.png" v-show="sshow" >
			<img src="demo/build/logo.png" v-if="iif" >
			<img src="demo/build/logo.png" v-show="age>=18" >
		</div>
		<script>
			var app = new Vue({
				el:'#app',
				data:{
					sshow:true,
					iif:false
					age:18,
				}
			})
		</script>
```

#### `v-else`

前一兄弟元素必须有 `v-if` 或 `v-else-if`。

为 `v-if` 或者 `v-else-if` 添加“else 块”。

```html
<div v-if="Math.random() > 0.5">
	Now you see me
</div>
<div v-else>
	Now you don't
</div>
```

#### `v-bind`

设置元素的属性，比如src、title、class。完整写法：`v-bind:属性名`,简写`:属性名`。

如下代码，给名为bder的类谁知一个边框。

静态设置可以直接给第一个img设置`v-bind:class="jt"`，data中`jt = bder`即可。

动态设置可以修改data的值。可以采用两种方法

- 三元表达式：`dt?'bder':''`第二个img设置`v-bind:class="dt"`，data中dj是布尔值，通过doactive方法来改变。dt的值是什么？如果true则添加类名bder，否则类名为空。
- 对象方法：`{bder:dt}`第三个img设置`v-bind:class="dt"`，data中dj是布尔值，通过doactive方法来改变。bder是否设置取决于dt的真假。

```html
		<style type="text/css">
			.bder{
				border: solid;
			}
		</style>	
		<div id="app">
			<img :src="imgSrc" v-bind:class="jt">
			<img :src="imgSrc" :class="{bder:dt}" @click="doacitve" >
			<img :src="imgSrc" :class="dt?'bder':''" @click="doacitve" >
		</div>
		<script>
			var app = new Vue({
				el:'#app',
				data:{
					imgSrc:"demo/build/logo.png",
					jt:"bder",
					dt:false
				},
				methods:{
					doacitve:function(){
						this.dt=!this.dt;
					}
				}
			})
		</script>
```

#### `v-for`

根据数据生成列表结构，是响应式的。

`v-for="(i,item) in arr"`i内容 item索引 

`v-for="item in arr"`item内容

```html
	<div id="app">
		<ul>
			<li v-for="(i,item) in arr"> 
				{{"item = " + item}}  {{"　　i = " + i}}
			</li>
		</ul>
		<ol>
			<li v-for="(item) in objarr"> 
				{{"item = " + item.city}} 
			</li>
		</ol>
		<input type="button" value="add" @click="add" />
		<input type="button" value="subpop" @click="subpop" />
		<input type="button" value="subshift" @click="subshift" />
	</div>
	<script>
		var app = new Vue({
			el: "#app",
			data: {
				arr: ["北京", "上海", "天津", "重庆"],
				objarr: [
					{city: "beijnig"},
					{city: "shanghai"},
					{city: "tianjin"},
					{city: "chongqing"}
				]
			},
			methods:{
				add:function(){
					this.objarr.push({city: "xxx"})
				},
				subpop:function(){
					this.objarr.pop()
				},
				subshift:function(){
					this.objarr.shift()
				}
			}
		})
	</script>
```
#### `v-on`

事件绑定`v-on:xxx`可以缩写为`@:xxx`

`<button v-on:click="doThis"></button>
<button @click="doThis"></button>`

可以传参数：`<button v-on:click="doThis(a,b……)"></button>`

其他常用：

```html
<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>
<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>
<!-- 阻止默认行为，没有表达式 -->
<form @submit.prevent></form>
<!-- 键修饰符，键别名 -->
<input @keyup.enter="onEnter">
<!-- 键修饰符，键代码 -->
```

#### `v-model`

获取和设置表单元素的值（双向数据绑定：解析之后表单元素会直接显示data的值，更改表单元素data的数据也会改变）

```html
	<div id="app">
		<input type="text" v-model="message" @keyup.enter="getMsg">
		<input type="button" value="点我更改" @click="setMsg">
		<h3>{{message}}</h3>
	</div>
	<script>
		var app = new Vue({
			el: "#app",
			data:{
				message:"aaaa"
			},
			methods:{
				getMsg:function(){			//获取表单元素值
					alert(this.message);
				},
				setMsg:function(){			//设置表单元素值
					this.message="hhahaa"
				}
			}
		})
	</script>
```
## Cli

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

