## Event Loop

### 基本概念

1. 同步任务：
2. 异步任务：
3. 执行栈：
4. 任务队列：
5. task：
6. microtask：

### 基本概念

事件循环机制(Event Loop)的存在源于 `JavaScript` 只支持单线程的核心特性，即对于多个需要响应的事件，或者说任务，需要进行排队等待响应。

在了解事件循环机制之前我们先来对任务进行一下划分：一个是最好理解的同步任务，指主线程上正在跑的代码，如一行 `console.log`；第二个是异步任务，即期望的事件在一段时间间隔后响应，如 `setTimeout(callback, 2000)` 中2秒后（顺利情况下）会执行的回调函数。

同步的任务会有很多，这些在主线程上正在执行的任务就形成了一个 `执行栈(execution context stack)`，而异步任务则排队形成一个 `任务队列(task queue)` 等待被响应。每当执行栈中所有同步任务都执行完毕，那么就读取任务队列等待被响应的异步任务塞入执行栈中执行响应，循环反复就是最基本的事件循环了。

### setTimeout

定时器 `setTimeout` 应该是最常见的一个创建异步任务的函数了，它可以接受一个函数入参和一个以毫秒(ms)为单位的延迟时间入参，在等待指定之间后响应执行这个函数，但是定时器能够正常在指定延迟后响应执行其实是说不准的，准确来说应该是主线程执行完执行栈中所有同步任务所需时间与指定延迟时间取长，这次是响应函数将会执行的实际响应时间。

```javascript
const start = new Date().getTime();
setTimeout(() => {
  const actualDelay = new Date().getTime() - start;
  console.log(`actual delay: ${actualDelay}ms`);
}, 2000);
while (new Date().getTime() - start < 3000) {
  // noop
}
const end = new Date().getTime();
console.log(`delay: ${end - start}ms`);
// delay: 3000ms
// actual delay: 3003ms
```

通过上述例子可以很好