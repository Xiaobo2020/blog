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

第三层也是一个匿名函数，其功能可以分为两点：1. 接收参数执行 `createStore` 函数，需要注意的是这里是最简化不包含中间件的 `createStore` 函数执行；2. 处理第一层具名函数中接收到的中间件数组，**实现对 `dispath` 的包裹**。

```javascript
const middlewareAPI = {
  getState: store.getState,
  dispatch: (...args) => dispatch(...args)
}
const chain = middlewares.map(middleware => middleware(middlewareAPI))
dispatch = compose(...chain)(store.dispatch)
```

上述这段代码就是中间件核心功能点的实现，首先可以看到利用一个 `m`

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
