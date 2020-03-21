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

`applyMiddleware` 为 `redux` 提供了一个开放的入口

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
