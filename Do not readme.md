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

#### [computed](https://cn.vuejs.org/v2/api/#computed)/计算属性

**类型**：`{ [key: string]: Function | { get: Function, set: Function } }`

计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。

注意如果你为一个计算属性使用了箭头函数，则 `this` 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

```
  computed: {
    aDouble: vm => vm.a * 2
  }
```

计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是**不会**被更新的。
与普通方法相比较：在一个页面中多处使用普通方法，触发事件普通方法会多次调用。但是计算属性只会调用一次，然后将结果缓存。


#### [props](https://cn.vuejs.org/v2/api/#props)

**类型**：`Array | Object`

**接收来自父组件的数据**。

- props 可以是简单的数组
- 或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。你可以基于对象的语法使用以下选项：
    - `type`：可以是下列原生构造函数中的一种：`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`、任何自定义构造函数、或上述内容组成的数组。会检查一个 prop 是否是给定的类型，否则抛出警告。Prop 类型的[更多信息在此](https://cn.vuejs.org/v2/guide/components-props.html#Prop-类型)。
    - `default`：`any`
      为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。对象或数组的默认值必须从一个工厂函数返回。
    - `required`：`Boolean`
      定义该 prop 是否是必填项。在非生产环境中，如果这个值为 truthy 且该 prop 没有被传入的，则一个控制台警告将会被抛出。
    - `validator`：`Function`
      自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 falsy 的值 (也就是验证失败)，一个控制台警告将会被抛出。你可以在[这里](https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证)查阅更多 prop 验证的相关信息。

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
- `.once` - 只触发一次回调。
- `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
- `.capture` - 添加事件侦听器时使用 capture 模式。
- `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
- `.native` - 监听组件根元素的原生事件。
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

- **预期**：随表单控件类型不同而不同。
- **限制**：
  - `<input>`
  - `<textarea>`
  - `<select>`
  - components
- **修饰符**：
  - [`.lazy`](https://cn.vuejs.org/v2/guide/forms.html#lazy) - 取代 `input` 监听 `change` 事件
  - [`.number`](https://cn.vuejs.org/v2/guide/forms.html#number) - 输入字符串转为有效的数字
  - [`.trim`](https://cn.vuejs.org/v2/guide/forms.html#trim) - 输入首尾空格过滤



#### 补充

##### key

- **预期**：`number | string`

  `key` 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

  有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误。

  最常见的用例是结合 `v-for`：

  ```
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  它也可以用于强制替换元素/组件而不是重复使用它。当你遇到如下场景时它可能会很有用：

  - 完整地触发组件的生命周期钩子
  - 触发过渡

#####  [ref](https://cn.vuejs.org/v2/api/?#ref)

- **预期**：`string`

  `ref` 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例：

  ```
  <!-- `vm.$refs.p` will be the DOM node -->
  <p ref="p">hello</p>
  
  <!-- `vm.$refs.child` will be the child component instance -->
  <child-component ref="child"></child-component>
  ```

  当 `v-for` 用于元素或组件的时候，引用信息将是包含 DOM 节点或组件实例的数组。

  关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！`$refs` 也不是响应式的，因此你不应该试图用它在模板中做数据绑定。

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

## 实例方法 / 事件

### 1.emit

 [`emit( eventName, […args] )`](https://cn.vuejs.org/v2/api/?#vm-emit)

   - **参数**：

     - `{string} eventName`
     - `[...args]`

     触发当前实例上的事件。附加参数都会传给监听器回调。

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

### 3.axios/fetch

**fetch**：W3C的标准

```js
fetch("文件地址").then(res=>{
    return res.json()		//第一个不是返回json的内容，而是返回获取文件状态
}).then(res=>{				//需要使用第二个fetch获取json内容
    console.log(res)
})

fetch("文件地址").then(res => res.json()).then(res => {}) //简写
```



**axios**：

```javascript
axios.get("文件地址").then(res => {...})
```

### 4.父子组件之间的传播

父传子使用`props`，例如组件top，在top上添加属性，然后使用props传递属性，top的template中就可以使用数据。

子传父

- 使用`$emit`，例如组件child，在child中添加方法this.$emit(事件名称, 要传递的数据)，然后在child中使用该方法，child的template中触发该方法，child中也会接受到数据。
- 使用`ref`，子组件中使用ref，父标签就可以使用$refs访问到所有添加了res属性的子组件。





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

