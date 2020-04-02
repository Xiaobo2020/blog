## Redux Thunk

> 2020.04.02

`redux-thunk` 是一个 `redux` 的中间件，主要解决了异步调用 `dispatch` 的问题，也就是说，通过 `redux-thunk` 我们能实现异步 action。

### Source code

```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

### Analysis

说来简单，`thunk` 的核心部分只有四行，

```javascript
if (typeof action === 'function') {
  return action(dispatch, getState, extraArgument);
}
return next(actions);
```

即，针对于 `dispatch` 接收的参数 `action` 进行类型判断：

1. 若是函数类型，那么以 `dispatch` 等为入参执行这个函数并返回结果；
2. 若不是函数类型，就认为是正常的 action 并正常触发 dispatch;

因为这样的处理，我们在编写 **action creator** 的时候就可以这样来写：

```javascript
const increment = () => ({type: 'INCREMENT'});
const incrementAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, 1000);
};

dispatch(increment()); // increase immediately
dispatch(incrementAsync()); // increase delay 1s
```

### Extension

核心部分的理解还是相对较为容易的，但是最让我困惑的是作为入参的 `dispatch`，在读过 `applyMiddleware` 之后会知道有一个 `middlewareAPI` 的入参，这就是源码中解构入参的来源，可是明明其中定义的 `dispatch` 我记得是一个 `throw new Error('...')` 的函数，为什么这里作为触发 `action` 的方法会有效呢？

```javascript
let dispatch = () => {console.log('constructing ...')}
const store = {
  dispatch () {console.log('store.dispatch ...')}
}
const enhancer = {
  dispatch () {console.log('enhancer.dispatch ...')}
}
const api = {
  dispatch: (...args) => dispatch(...args)
}
api.dispatch(); // constructing ...
dispatch = store.dispatch;
api.dispatch(); // store.dispatch ...
dispatch = enhancer.dispatch;
api.dispatch(); // enhancer.dispatch ...
```

可以看到三次调用 `api.dispatch()` 打印结果都是不同的，这里有个概念就是 **延迟执行**，当调用 `api.dispatch` 的时候，实际上回去寻找第一行中定义的 `dispatch` 变量，三次调用 `dispatch` 指向不同的函数，所以打印不同结果。而实际上，**延迟执行** 的概念在 `applyMiddleware` 和 `redux-thunk` 中都有。

## Link

+ [上一篇：**Promise A+规范（翻译）**](../Syntax/PromisesA+.md)
