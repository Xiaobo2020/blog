## forEach

> 2020.03.17

### Syntax

```javascript
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
```

+ `callback` 为数组中每个元素执行的函数
+ + `currentValue` 当前元素
+ + `index` 当前元素位于数组中的索引
+ + `array` 当前正在处理的数组
+ `thisArg` 当执行 **`callback`** 回调函数时作为 `this` 的值，注意针对于箭头函数的回调函数无效

### Realization

```javascript
Array.prototype.myForEach = function (fn, ctx = this) {
  for (let i = 0; i < this.length; i++) {
    fn.call(ctx, this[i], i, this);
  }
};
```

### Example

```javascript
let obj1 = {
  count: 2,
  print: function (arr = [], ctx = this) {
    arr.myForEach(function (v) {
      console.log(v * this.count)
    }, ctx);
  }
}
let obj2 = {
  count: 3,
}
let arr = [1,1,1];
obj1.print(arr);
// 2 2 2
obj1.print.call(obj2, arr);
// 3 3 3
obj1.print(arr, obj2);
// 3 3 3
```

