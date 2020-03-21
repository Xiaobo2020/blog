## compose (Redux)

> 2020.03.20

`compose` 有合成、组合的意思，它的存在其实是服务于中间件的，即当我们使用 `applyMiddleware` 实现功能增强的背后，其实就是利用了 `compose` 函数将这多个增强函数进行合理的组合。

### Source Code
```javascript
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  // 这里对原码进行了一定的扩展补充，便于理解功能实现 
  // return funcs.reduce((a, b) => (...args) => a(b(...args)))
  return funcs.reduce((a, b) => {
    // 返回一个函数，所以 a 是之前所有迭代函数的累积
    return (...args) => {
      // 支持接受若干参数
      // 第一步将参数作为入参给到当前迭代函数 b，并执行
      // 第二部将 b 执行的结果作为入参给到累积的函数 a，即把当前迭代函数加入到累积中
      return a(b(...args));
    }
  }
}
```

### Analysis

首先，`compose`函数利用了es6的rest参数，将多个类型为函数的参数收集到一个叫作`funcs`的数组中，然后进行下一步逻辑判断，最终结果都会是返回一个函数，保证输入输出。

1. 当 `funcs` 数组中没有函数，即为一个空数组时，传入什么，传出什么，没有操作。
2. 当 `funcs` 数组中有一个函数时，返回这个函数。
3. 当有多个函数的时候，`funcs` 会调用 `reduce` 方法，将多个函数嵌套，这里值得反复推敲，理解 `reduce` 到底如何实现功能的。
4. 多个函数嵌套执行存在一个先后顺序，即越是前面的函数入参，越是靠前执行。

### Example

```javascript
// 初始数据
let data = 1;
// 加1函数
const add1 = v => v + 1;
// 乘2函数
const multi2 = v => v * 2;

// 1. compose没有参数
const func1 = compose();
func1(data); // -> 1

// 2. compose有一个参数，为add1
const func2 = compose(add1);
func2(data); // add1(1) = 1 + 1 = 2

// 3. compose有两个参数，顺序依次为add1与multi2
const func3 = compose(add1, multi2);
func3(data); // add1(multi2(1)) = 1 * 2 + 1 = 3

// 4. compose有两个参数，顺序依次为multi2与add1
const func4 = compose(multi2, add1);
func4(data); // -> multi2(add(1)) = 2 * (1 + 1) = 4
```

可以从 `func3` 和 `func4` 很明显的看到，由于创建时候的入参顺序不同，函数执行顺序不同，最终结果也不同。
