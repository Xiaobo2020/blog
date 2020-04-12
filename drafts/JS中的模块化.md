## JavaScript中的模块化

> 2020.04.12

### CommonJS

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

### AMD

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

### ESModule

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

## Link

