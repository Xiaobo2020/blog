## call

> 2020.03.22

### Syntax

```javascript
function.call(thisArg, arg1, arg2, ...)
```

+ `thisArg` 函数**`function`** 运行时 `this` 的值，默认为全剧对象
+ `arg1`、`arg2`等 表示函数 **`function`** 执行时参数序列
+ 返回函数 **`function`** 在以 `thisArg` 为上下文的条件下运行的结果


### Realization

```javascript
Function.prototype.myCall = function (ctx, ...args) {
  return this.bind(ctx)(...args);
}
```

### Example

```javascript
var obj1 = {
  a: 1,
  print: function (text = 'defined in obj1') {
    console.log(this.a, text);
  },
}
var obj2 = {
  a: 2,
};
obj1.print(); // 1 defined in obj1
obj1.print.myCall(obj2, 'called in obj2'); // 2 called in obj2
```

### Extension

与 `call` 相类似的一个方法就是 `apply`，不同在于两个方法对于函数运行的参数的输入方式不同，`call` 接收一个序列为参数，而 `apply` 接收的是由参数序列组成的数组作为入参。

不管是 `bind`、`call` 还是 `apply`，核心作用都是改变函数运行时 `this` 的指向，比较常见的就是 `React` 组件中，通常会对内部定义的方法做一次 `bind` 的操作，即绑定方法以本组件为执行上下文，这样在作为 `prop` 传递给其他组件的时候就不会更改为调用的其他组件为上下文。

## Link

+ [上一篇：**Redux源码 —— applyMiddleware**](../Redux/applyMiddleware.md)
+ [下一篇：**事件循环机制 —— Event Loop**](../Others/EventLoop.md)