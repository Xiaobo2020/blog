## createStore (Redux)

### Source Code

```javascript
function createStore(reducer, preloadedState, enchancer) {
  function dispatch () {
    // 触发更新state ...
  }
  function subscribe (listener) {
    // 订阅 ...
    return function unsubscribe () {
      // 解除订阅 ...
    }
  }
  function getState () {
    // 获取内部状态 ...
  }
  function replaceReducer () {
    // ...
  }
  function observable () {
    // ...
  }
  // 返回的api ...
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}
```

### getState

`Redux` 会维护内部状态变量 `currentState`，`getState` 方法的作用非常单一，就是返回这个内部状态。

### subscribe

源码中的 `subscribe` 函数其实就是使用了订阅/发布模式，在每次进行 `dispatch` 操作之后都会执行一次有效注册的 `listener`，可以参考另一篇文章 —— [EventEmitter](../DIY/EventEmitter.md)配合理解，这里不做赘述。

### 