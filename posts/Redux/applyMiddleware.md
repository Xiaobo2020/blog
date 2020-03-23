## applyMiddleware (Redux)

> 2020.03.22

`applyMiddleware` 让中间件能方便、快速、灵活地服务于 `redux`，也让 `redux` 充满了非常多的扩展性，如常见的日志中间件、处理异步问题的 `redux-thunk` 等等。

### Source Code

```javascript
function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```

### Analysis

仔细查看 `applyMiddleware` 可以发现存在多个函数嵌套，在充分理解箭头函数简化写法的基础上可以看出共分为三层函数嵌套，下面逐一进行分析：

第一层即具名函数 `applyMiddleware`，这一层主要是为了获取接收多个中间件函数作为入参，很好理解。

第二层是一个匿名函数，其功能为接收 `createStore` 函数方法作为入参，可以猜想到，在 `redux` 的内部，当时用到 `applyMiddleware` 的时候肯定有一步操作是将创建方法函数传进来使用（对应 `createStore` 函数中针对有 `enhancer` 的情况）。

第三层也是一个匿名函数，其功能可以分为两点：1. 接收参数执行 `createStore` 函数；2. 处理第一层具名函数中接收到的中间件数组，**实现对 `dispath` 的包裹**。

```javascript
const middlewareAPI = {
  getState: store.getState,
  dispatch: (...args) => dispatch(...args)
}
const chain = middlewares.map(middleware => middleware(middlewareAPI))
dispatch = compose(...chain)(store.dispatch)
```

上述这段代码就是中间件核心功能点的实现，这里手动创建了一个接口对象，里面包含了获取状态的方法 —— `getState`，以及一个临时的 `dispatch` 方法，注意这个方法并不是 `redux` 的 `dispatch` 的方法，只是一个同名且功能单一的方法 —— 抛出一个异常，没错，这个方法并不能提供真正的触发状态变化，真正的触发函数在下面两行中创建出来。

对于接收到的中间件数组先使用一个 `map` 函数为每个中间件注入上边提到的接口对象，注意这里真正可供使用的是 `getState`，切勿使用这个对象中解构出来的 `dispatch` （伪造）函数，这一步可以获得处理过的函数数组。

其次使用之前提过的 `compose` 方法（可参考[这里](./compose.md)）将这些函数进行组合，同时为组合好后得到的新函数注入真正的可触发状态变化的 `store.dispatch` 方法，可以很合理的推测，中间件的实现中也会有一步对应的操作是接收一个 `dispatch` 方法。

### Example

以自己实现的最简单的日志中间件(`logger`)为例，实现功能只为添加一行 `console.log` ，代码如下：

```javascript
function logger({getState}) {   // line 1
  return function(dispatch) {   // line 2
    return function(action) {   // line 3
      console.log(action);      // line 4
      return dispatch(action);  // line 5
    };
  };
}
```

+ line1 对应获取接口对象，这里除了 `getState` 还包含一个伪造不可用的 `dispatch` 方法，当然如果调用这个方法只会抛出一个异常
+ line2 第二层匿名函数就是 `applyMiddleware` 使用 `compose` 方法组合的实际函数入参了，这一层也会接收到一个 `dispatch` 方法，与 line1 不同的是这里的才是真正有效的 `dispatch`。
+ line3 第三层匿名函数接收一个 `action`，用于内部触发 `dispatch(action)`
+ line4 这里就是这个日志中间件的目的，没错就是为了一行 `console.log(action)`
+ line5 调用真正的 `dispatch` 函数触发状态变化，同时作为返回值返回

如果完整的看下来， line3 所在的整个函数可以被认为是一个自定的 `dispatch` 函数，为什么这么说，不看内部实现，单纯从入参和功能上看，它接收一个 `action`，它触发一次状态变化，这不就是一个 `redux` 的 `dispatch` 函数的功能吗？那么这样就很好理解中间件的核心本质了：***通过对原生 `dispatch` 进行包裹，加入自己需要的功能，得到一个新的 `dispatch` 函数***

再针对 line2 多说两句，正因为有了这一层，使得多个中间件能够完美的组合，因为中间件每次输出都是一个新的 `dispatch` 函数，正好为下一个中间件的入参 —— `dispath`，不得不说这个设计很nice

### Extension

可能第一次阅读 `applyMiddleware` 或者 `logger` 的源码会感觉非常费解，多个函数嵌套，每层都接收点参数，为什么要这么麻烦，这里不得不提到一个概念 **柯里化**，感兴趣的可以看看这篇文章：[详解JS函数柯里化](https://www.jianshu.com/p/2975c25e4d71)，网上也有很多，可自行搜索查看。

## Link

+ [上一篇：**事件的监听 —— EventEmitter (DIY)**](../DIY/EventEmitter.md)
+ [下一篇：**改变上下文的指向 —— call (DIY)**](../DIY/call.md)