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

### Extension

#### Polyfill and others

摘自 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill)

```javascript
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

  Array.prototype.forEach = function(callback, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling toObject() passing the
    // |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get() internal
    // method of O with the argument "length".
    // 3. Let len be toUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If isCallable(callback) is false, throw a TypeError exception. 
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let
    // T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

      var kValue;

      // a. Let Pk be ToString(k).
      //    This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty
      //    internal method of O with argument Pk.
      //    This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal
        // method of O with argument Pk.
        kValue = O[k];

        // ii. Call the Call internal method of callback with T as
        // the this value and argument list containing kValue, k, and O.
        callback.call(T, kValue, k, O);
      }
      // d. Increase k by 1.
      k++;
    }
    // 8. return undefined
  };
}
```

## Link

+ [上一篇：**for ... in**](../forIn.md)
+ [下一篇：**执行上下文的绑定 —— bind (DIY)**](./bind.md)