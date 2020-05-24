## JavaScript中的模块化

> 2020.04.12

### 分类
#### CommonJS

NodeJS 就是一个基于 V8 引擎，事件驱动 I/O 的服务端JS运行环境，在2009年刚推出时，它就实现了一套名为 `CommonJS` 的模块化规范。

在 CommonJS 规范里，每个 JS 文件就是一个 模块 (module) ，每个模块内部可以使用 `require` 函数和 `module.exports` 对象来对模块进行导入和导出。

```javascript
// index.js
require("./moduleA");
const m = require("./moduleB");
console.log(m);

// moduleA.js
const m = require("./moduleB");
setTimeout(() => console.log(m), 1000);

// moduleB.js
const m = new Date().getTime();
module.exports = m;
```

+ **index.js** 代表的模块通过执行 `require` 函数，分别加载了 `./moduleA.js` 和 `./moduleB.js` 的两个模块，同时输出 **moduleB** 模块的结果。
+ **moduleA.js** 代表的模块通过 `require` 函数，加载了 `./moduleB.js` 模块，使用定时器延迟1s打印 **moduleB** 的结果。
+ **moduleB** 代表的模块相对比较简单，创建一个记录当前时间的变量，并通过 `module.exports` 导出到外部使用。

#### AMD

除了NodeJS，另一个常用JS运行环境就是浏览器了。由于浏览器本身的属性，它发展出了AMD、SystemJS等适合浏览器的模块化规范。

AMD 全称 **`Asynchronous module definition`**，意为 `异步的模块定义`，不同于 CommonJS 规范的同步加载，AMD 正如其名所有模块默认都是 **异步加载**，这也是早期为了满足 web 开发的需要，因为如果在 web 端也使用同步加载，那么⻚面在解析脚本文件的过程中可能使⻚面暂停响应。

```javascript
 
// index.js
require(
  ['moduleA', 'moduleB'],
  function(moduleA, moduleB) {
    console.log(moduleB);
  },
);
// moduleA.js
define(function(require) {
  const m = require('moduleB');
  setTimeout(() => console.log(m), 1000);
});
// moduleB.js
define(function(require) {
  const m = new Date().getTime();
  return m;
});
```

如果想要使用 AMD 规范，我们还需要添加一个符合 AMD 规范的加载器脚本在⻚面中，符合 AMD 规范实现 的库很多，比较有名的就是 **`RequireJS`**。

#### ESModule

不管是 CommonJS 还是 AMD 规范，他们都有这样几个特点：

1. 模块化规范和JS运行环境相关联。
2. 不同环境不可以共用模块。

在 ES6 之后，JavaScrip 有了自己的模块化规范，也就是 ESModule，它使用 `import` 和 `export` 作为导入和导出的关键字。

```javascript
// index.js
import './moduleA';
import m from './moduleB';
console.log(m);

// moduleA.js
import m from './moduleB';
setTimeout(() => console.log(m), 1000);

// moduleB.js
const m = new Date().getTime();
export default m;
```

### 编译和打包

虽然ESModule是JavaScrpt语言层面上的模块化规范，也是未来一定会趋于统一的规范，但是 web 端受限于用户浏览器版本，暂时还无法随心所欲的使用JS的最新特性，所以兼容性的问题亟待解决。社区中涌现了各式各样的编译工具，最常用的就是 `babel` 了。

然而，就算使用了 babel 来解析编译 ESModule 规范的代码，最终生成的还是带有 `require` 和 `exports` 的 CommonJS 规范的代码，还是无法直接运行在浏览器中，所以这个时候还需一个步骤 —— **打包（bundle）**，用来抹平不同运行环境的模块化定义内部细节，实现无论是AMD还是CommonJS规范的模块，打包之后都能直接运行在Node或WEB中。

## Link

+ [上一篇：**树的遍历搜索**](../Others/树的遍历搜索.md)
+ [下一篇：**简版Promise及相关方法实现**](../DIY/简版Promise实现.md)