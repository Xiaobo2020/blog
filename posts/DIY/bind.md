## bind

> 2020.03.18

### Syntax

```javascript
function.bind(thisArg, arg1, arg2, ...)
```

+ `thisArg` 函数 **`function`** 运行时 `this` 的值，默认为全局对象
+ `arg1`、`arg2`等 表示函数执行时预设参数序列
+ 返回一个绑定了 `thisArg` 为上下文的函数

### Realization

```javascript
Function.prototype.myBind = function (ctx, ...args1) {
  const _this = this;
  // 省略对_this的函数类型判断
  return function (...args2) {
    const args = [].concat(args1, args2);
    return _this.apply(ctx, args);
  }
}
```

### Example

```javascript
var obj1 = {
  count: 1,
  print: function (step = 1) {
    console.log(this.count + step);
  }
}
var obj2 = {
  count: 2,
}
const print1 = obj1.print.myBind(obj2);
const print2 = obj1.print.myBind(obj2, 2);
print1(); // 3
print2(); // 4
print2(99); // 4
obj1.print(); // 2
obj1.print(2); // 3
```

### Extension

针对入参数文中使用的是 `...` 收集参数，也可以考虑使用函数自带的 `arguments`，当然考虑到这是一个类数组类型，需要一次转化为数组的操作

```javascript
const argList = Array.prototype.slice.apply(arguments);

// 这里用bind封装一个可直接调用的函数来处理类数组的转换
const slice = Function.prototype.apply.bind(Array.prototype.slice);
const argList = slice(arguments);
```

## Link

+ [上一篇：**forEach (DIY)**](../DIY/forEach.md)
+ [下一篇：**防抖(debounce)和节流(throttling) (DIY)**](../DIY/防抖和节流.md)