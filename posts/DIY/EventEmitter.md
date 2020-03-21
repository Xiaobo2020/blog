## EventEmitter

> 2020.03.21

事件监听在开发过程中被广泛应用，如 `Vue` 中常用的 `vm.$on` 和 `vm.$emit` 就是自己实现了一套事件监听逻辑挂载到了 `Vue` 原型上。

### Realization

实现核心在于维护和使用一个全局的事件对象(`_events`)，在上面注册、移除、遍历触发各个事件对应的响应函数。

```javascript
function EventEmitter () {
  const _events = {};
  this.on = function (event, fn) {
    // 注册 ...
  };
  this.emit = function (event, ...args) {
    // 触发 ...
  };
  this.off = function (event, fn) {
    // 关闭 ...
  };
  this.once = function (event, fn) {
    // 一次性注册（阅后即删） ...
  };
}
```

#### on

监听事件的注册，主要实现功能描述如下：

1. 支持同一响应函数(`fn`)注册在多个事件(`event`)下；
2. 支持同一响应函数多次注册在同一个事件下；

`on` 实现如下：

```javascript
this.on = function (event, fn) {
  if (Array.isArray(event)) {
    // multi events handler
    for (let i = 0; i < event.length; i++) {
      this.on(event[i], fn);
    }
  } else {
    // single event handler
    (_events[event] || (_events[event] = [])).push(fn);
  }
}
```

#### emit

监听事件的触发，主要实现功能描述如下：

1. 支持同时触发注册在指定事件下的多个响应函数；
2. 支持触发事件时携带响应函数所需入参序列；

`emit` 实现如下：

```javascript
this.emit = function (event, ...args) {
  const cbs = _events[event];
  if (cbs) {
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](...args);
    }
  }
};
```

#### off

监听事件的移除，主要实现功能描述如下：

1. 支持同时移除注册在多个事件下的同一个指定响应函数；
2. 支持同时移除注册在某个事件下的所有响应函数；

`off` 实现如下：

```javascript
this.off = function (event, fn) {
  if (Array.isArray(event)) {
    // multi events handler
    for (let i = 0; i < event.length; i++) {
      this.off(event[i], fn);
    }
    return;
  }
  const cbs = _events[event];
  if (!cbs) {
    // no event
    return;
  }
  // single event handler
  if (!fn) {
    // no fn, clean all
    _events[event] = [];
    return;
  }
  if (fn) {
    // clean extract fn
    _events[event] = _events[event].filter(cb => cb !== fn);
  }
};
```
#### once

监听事件的一次性注册（阅后即删），实现功能描述如下：

1. 具有普通注册(`on`)的所有功能；
2. 注册在事件下的响应函数能且仅能触发一次，响应过后自动移除；

要实现一次性注册逻辑，可以很巧妙地复用 `on` 和 `off` 的现有功能，即在内部创建一个新的响应函数(`_fn`)，在新响应函数中包裹移除自身的功能，然后注册这个新的响应函数，具体实现如下：

```javascript
this.once = function (event, fn) {
  // create a new fn named '_fn'
  const _fn = (...args) => {
    // handle off
    this.off(event, _fn);
    // call origin fn
    fn(...args);
  }
  // add new fn named '_fn'
  this.on(event, _fn);
};
```

### Example

```javascript
const bus = new EventEmitter();
const obj1 = {
  count: 1,
  fn: function () {
    console.log(`obj1 ${this.count}`);
  }
}
const obj2 = {
  count: 2,
  fn: function () {
    console.log(`obj2 ${this.count}`);
  }
}
bus.once('fn', obj1.fn);
bus.on('fn', obj1.fn);
bus.on('fn', obj2.fn.bind(obj2));

bus.emit('fn');
// obj1 undefined
// obj1 undefined
// obj2 2

bus.emit('fn');
// obj1 undefined
// obj2 2
```

上述例子中可以看出几个很明显的点：

1. 一次性注册(`once`)的事件响应函数和普通注册(`on`)的响应函数是同一个，但因为只有 `once` 的响应函数被移除了，说明内部注册时使用的 `fn` 其实是不一样的；
2. 注册的响应函数不包含执行上下文，可以很明显看到 `obj1.fn` 这个响应函数没有如预期打印 `obj1 1`，而只有显示绑定 `obj2.fn.bind(obj2)` 才正常如期打印结果；

### Summary

事件的监听与触发可以归类为一种常用的设计模式 —— **订阅发布模式**，有趣的设计模式还有很多，后面一一详解。

## Link

+ [上一篇：**Redux源码 —— compose**](../Redux/compose.md)