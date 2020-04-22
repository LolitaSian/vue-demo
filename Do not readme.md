# 写个小笔记？:slightly_smiling_face:

API：https://cn.vuejs.org/v2/api

## 基础语法

```html
<div id="app">
  {{ message }}
</div>
```

`new Vue({})`声明Vue实例

`el:`挂载点，默认是id选择器，其实其他的css选择器也可以用，但是建议使用id选择器。

指定挂载的元素之后，该区域会被vue渲染。

### vue中的[选项 / 数据](https://cn.vuejs.org/v2/api/#选项-数据)

#### data / 数据

**类型**：Object | Function

**限制**：组件的定义只接受 `function`。

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

#### methods/方法

**类型**：`{ [key: string]: Function }`

**详细**：methods 将被混入到 Vue 实例中。可以直接通过 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 Vue 实例。

注意，**不应该使用箭头函数来定义 method 函数**，箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.a` 将是 undefined。

***

### 指令

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

**类型：**string

设置标签的内容（textContent）与`{{}}`插值表达式相比，插值表达式不会影响标签中原来的内容，但是`v-text` 会完全替换标签内容。两个都可以使用表达式，例如：

`{{ message + "hahaha"}}`

 `{{v-text = "message + 'hahaha'"}}`


#### `v-html`

设置元素的innerHTML。普通文本显示效果和`v-text` 一样，凡是如果内容中有HTML结构会被解析为标签。

#### `v-show v-if`
v-show 根据元素的真假切换元素的显示状态，实际是修改display的值。

v-if 根据元素的真假切换元素的显示状态，实际是操作dom树。

操作频繁的多使用`v-show`

#### `v-else-if v-else`

前一兄弟元素必须有 `v-if` 或 `v-else-if`。

`v-else-if`为`v-if` 或者 `v-else-if` 添加“else if 块”

`v-else`为 `v-if` 或者 `v-else-if` 添加“else 块”。

```html
<div v-if="Math.random() > 0.5">
	Now you see me
</div>
<div v-else>
	Now you don't
</div>
```

#### `v-bind`

设置元素的属性，比如src、title、class。

**完整写法：**`v-bind:属性名`

**简写:**`：属性名`。

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
#### `v-on`

事件绑定`v-on:xxx`

**缩写**：`@`

**预期**：`Function | Inline Statement | Object`

**参数**：`event`
**修饰符**：

- `.stop` - 调用 `event.stopPropagation()`。
- `.prevent` - 调用 `event.preventDefault()`。
- `.capture` - 添加事件侦听器时使用 capture 模式。
- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
- `.native` - 监听组件根元素的原生事件。
- `.once` - 只触发一次回调。
- `.left` - (2.2.0) 只当点击鼠标左键时触发。
- `.right` - (2.2.0) 只当点击鼠标右键时触发。
- `.middle` - (2.2.0) 只当点击鼠标中键时触发。
- `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器

在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 `$event` 属性：`v-on:click="..."`。

#### `v-for`

根据数据生成列表结构，是响应式的。

**预期**：`Array | Object | number | string | Iterable (2.6 新增)`

**用法**：

- `v-for="(item, index) in items`
- `v-for="(val, key) in object`
-  `v-for="(val, name, index) in object` name是序号0.1.2...

`v-for` 的默认行为会尝试原地修改元素而不是移动它们。要强制其重新排序元素，你需要用特殊属性 `key` 来提供一个提示，`key`跟踪每个节点的身份，从而达到重用或者重排现有元素。理想的key值是每个元素都有一个id。

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

## 实例方法/数据

### 1.set

 [set( target, propertyName/index, value )](https://cn.vuejs.org/v2/api/#vm-set)

- **参数**：
  - `{Object | Array} target`
  - `{string | number} propertyName/index`
  - `{any} value`
- **返回值**：设置的值。
- **用法**：`Vue.set()` 

### 2.watch

[watch( expOrFn, callback, options) ](https://cn.vuejs.org/v2/api/#vm-watch)

- **参数**：

  - `{string | Function} expOrFn`

  - `{Function | Object} callback`

  - `{Object} [options]`
    - `{boolean} deep`
    - `{boolean} immediate`

- **返回值**：`{Function} unwatch`

- **用法**：

  观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。

  注意：在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。



## 简单的小功能

### 1.绑定标签属性

**静态绑定**

`<div :class="xxx" "></div>`

可以直接在`Vue({})`的data中给xxx赋值。

**动态绑定**

- **方法1**：三元表达式

  点击即可切换背景颜色

	```html
		<style type="text/css">
			.red { background-color: red; }
			.orange { background-color: orange; }
		</style>

		<div id="app">
			<div :class="isTrue?'red':'orange'" @click="change()">1</div>
		</div>
		<script>
			new Vue({
				el: "#app",
				data: {
					isTrue: true
				},
				methods: {
					change: function() {
						this.isTrue = !this.isTrue
					}
				}
			})
		</script>
	```

- **方法2**：对象绑定

  但是有缺陷，添加新元素会出问题，下边代码中直接change方法添加一个border，但是却添加不上。（可以使用`Vue.set()`抢救一下）

  ```html
      <style type="text/css">
          .color { color: red; }
          .size { font-size: 20px; }
      </style>
  
      <div id="app">
          <div :class="obj" @click="change()">1</div>
      </div>
      <script>
          new Vue({
              el: "#app",
              data: {
                  obj: {
                      color:true,
  					size:true
                  }
              },
  			methods:{
  				change:function(){
  					this.obj.border = true
                      //Vue.set(this.obj,"border",true) 这么写就好使了
  				}
  			}
          })
      </script>
  ```
  
- **方法3**：数组绑定

  ```html
  <style type="text/css">
  	.color { color: red; }
  	.size { font-size: 20px; }
  	.border { border: solid; }
  </style>
  <div id="app">
  	<div :class="arr" @click="change()">1</div>
  </div>
  <script>
  	new Vue({
  		el: "#app",
  		data: {
  			arr: ["color", "size"]
  		},
  		methods: {
  			change: function() {
  				this.arr.push("border")
  			}
  		}
  	})
  </script>
  ```

### 2.动态创建和删除

​	见01加减按钮

### 3.



## Cli

### 页面跳转

建好项目之后，进入目录的`src-->component`在这个文件夹中新建.vue的文件。

然后去`src-->router`文件夹下打开index.js

将文件引入：`import 变量名 from '@/components/文件名`

- 变量名默认大写
- 文件名就是你新建的文件的名字

```javascript
 routes: [{
      path: '/',   		 // “/”代表根页面
	  name:   ,
      component:变量名		//
    }
```

```vue
<template>
  <div>
    <router-link to="/children"></router-link> 
      //相当于<a>
    <router-view></router-view> 
      //路由挂载点，想要将页面显示在哪部分就写在哪部分
  </div>
</template>
```

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

### 页面传参

```javascript
this.$router.push('路径?value = xxx')
//可以用代码实现跳转

//组件的页面中通过this.$route.query 即可访问到对应的value

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

