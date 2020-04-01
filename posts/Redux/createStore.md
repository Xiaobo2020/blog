## createStore (Redux)

> 2020.03.29

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

```javascript
function getState() {
  if (isDispatching) {
    throw new Error(' ... ')
  }
  return currentState
}
```

`Redux` 会维护内部状态变量 `currentState`，`getState` 方法的作用非常单一，就是返回这个内部状态，不过需要注意的是需要判断当前是否正在执行 `reducer` 操作。

### subscribe

源码中的 `subscribe` 函数其实就是使用了订阅/发布模式，在每次进行 `dispatch` 操作之后都会执行一次有效注册的 `listener`，可以参考另一篇文章 —— [EventEmitter](../DIY/EventEmitter.md)配合理解，这里不做赘述。需要注意的是由于执行 `reducer` 期间订阅的事件存在新增或减少的可能，所以订阅事件的增减应该在下一个事件列表中进行，所以会有这个函数：

```javascript
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }
```

### dipatch

`dispatch` 的作用分为两个，一是对于接收的**action**执行 `reducer`，完成状态的更新操作；二是触发订阅的事件，进行通知。

由于之前提到的订阅事件可能发生在任何时候，所以需要保证事件下发不会遗漏，这里使用了两个变量：`currentListeners` 和 `nextListeners`，所有的 `subscribe` 对于事件的更改都会在 `nextListeners` 中进行，所有的 `dispatch` 都会从 `nextListeners` 获取一个新的 `currentListeners`，然后轮流下发通知。

```javascript
const listeners = (currentListeners = nextListeners)
for (let i = 0; i < listeners,length; i++) {
  const listener = listeners[i]
  listener()
}
```

## Link

+ [上一篇：**事件循环机制 —— Event Loop**](../Others/EventLoop.md)
+ [下一篇：**Promise A+规范（翻译）**](../Syntax/PromisesA+.md)
