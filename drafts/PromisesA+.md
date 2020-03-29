## Promise A+ 规范

### 术语

1. "promise" 是具有 `then` 方法的对象或函数，其行为遵守本规范。
2. "thenable" 是定义 `then` 方法的对象或函数。
3. "value" 是任何合法的 JavaScript 值（包括 `undefined`、一个 thenable 或者一个 promise）。
4. "exception" 是一个使用 `throw` 申明抛出的值。
5. "reason" 是一个值，该值说明为什么一个 promise 被 reject。

### 需求

#### Promise 的状态

一个 Promise 必须是三种状态之一： pending，fulfilled 或者 rejected。

1. 当一个 promise 处于 pending 状态：
    1. 可以转换为 fulfilled 状态或者 rejected 状态。
2. 当一个 promise 处于 fulfilled 状态：
    1. 不能转换为任何其他的状态；
    2. 必须要有一个 `value`，且必须不变。
3. 当一个 promise 处于 rejected 状态：
    1. 不鞥转换为任何其他的状态；
    2. 必须要有一个 `reason`，且必须不变。

这里的"必须不变"指的是定义不变（i.e. `===`），但并不表示深度不变。

#### `then` 方法

一个 promise 必须要提供一个 `then` 方法来访问其当前或最终的 value 或者 reason。

一个 promise 的 `then` 方法接受两个参数：

```javascript
promise.then(onFulfilled, onRejected)
```

1. `onFulfilled` 和 `onRejected` 都是可选参数：
    1. 如果 `onFulfilled` 不是一个函数，那么它会被忽略；
    2. 如果 `onRejected` 不是一个函数，那么它会被忽略；
2. 如果 `onFulfilled` 是一个函数：
3. 如果 `onRejected` 是一个函数：
4. 当执行栈中还存在其他同步任务时，`onFulfilled` 或者 `onRejected` 不能被调用；
5. `onFulfilled` 和 `onRejected` 必须被作为函数来被调用；
6. 在相同的 promise 中，`then` 方法可以被多次调用：
7. `then` 方法必须返回一个 promise:
    1. 如果
```javascript
promise2 = promise1.then(onFulfilled, onRejected)
```