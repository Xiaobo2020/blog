## Event Loop

> 2020.03.25

### 基本概念

来简略描述一下几个基本的概念，帮助后续介绍事件循环机制(Event Loop)时相对容易理解。

1. 同步任务：可以立即执行并响应的代码，如单纯的一行 `console.log(1)` —— 打印数字1；
2. 异步任务：相对于同步任务来说的概念，主要指执行的代码但是需要在一定时间间隔后才会进行响应，如定时器 `setTimeout`；
3. 执行栈：`JavaScript` 主线程上正在执行的所有同步任务的合集；
4. 任务队列：由等待被响应的异步任务组成的队列；
5. task：任务，最常见的为 `setTimeout`、
6. microtask：相对于 task 更小的任务级别，如 `Promise`；

`JavaScript` 只支持单线程，一次只能做一件事情，如果遇到的是同步任务，那么很好处理执行就OK了，但是对于如创建的定时器任务，那么就不可能阻塞等待事件的响应然后继续执行其他的任务，更合理的方式应该是将定时器等异步任务挂起，而所有被挂起的异步任务在满足可以被响应的条件后，就进入到了任务队列中，等待执行栈中所有同步任务都完成后，来任务队列中查看等待被响应事件进入到执行栈中执行，如此往复循环就是所谓的事件循环机制。

### 异步任务执行的条件

之前说到了，异步任务的响应需要在等待当前执行栈中所有同步任务结束后才会被触发。那么基于这个逻辑我们来看一下定时器 `setTimeout(callback, delay)`，它接受一个回调函数(callback)作为第一个入参，以及一个以毫秒为单位的延迟时间(delay)作为第二个入参。理论上来说回调函数(callback)会在经过延迟时间(delay)间隔后触发响应进行执行操作，但是结合异步任务需要在同步任务结束后再触发我们就不难看出来，其实定时器实际的响应时间间隔应该表述为当前执行栈中同步任务执行完毕所用时间与设定延迟时间取 **`大`**。

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

通过上述例子可以很好看出，设定的2000ms其实并没有真正起到作用，因为执行栈中同步任务的完成所需时间至少就是3000ms，这就很好证明了前面所说的实际时间间隔为两者取大这个说法。如果将最后两行代码注释掉再执行，可以2ms的延迟，这些都说明了，同步任务的执行也是需要耗费一定的时间的，而这些时间会对异步任务的响应造成直接影响。

更进一步地说明一下，因为涉及到I/O的操作，其实最后一行的 `console.log` 是这2ms的最大贡献者，普遍的I/O都很慢，这也是事件循环机制被设计出来主要想要处理的问题。

### 异步任务的划分

#### 问题

```javascript
setTimeout(() => {
  console.log('a');
}, 1);

console.log('b');

const t = new Promise((resolve) => {
  console.log('c');
  resolve();
});

setTimeout(() => {
  console.log('d');
}, 0);

t.then(() => {
  console.log('e');
});
```

#### tasks和microtasks

在对上述进行分析我们还是需要进行一下概念的确立：

1. `tasks`：指常规的异步任务，如 `setTimeout`、`setInterval`、UI rending或一次click操作等等；
2. `microtasks`：指穿插于执行栈重新装填、无 `JavaScript` 执行中的状态下可以执行的任务，如 `Promise` 的 `then` 方法、`process.nextTick`、`MutationObserver` 等。

如果需要为同步任务、microtasks、tasks这三者排个顺序，那么应该是这样的：执行栈中的同步任务 - 同步任务中包含的microtasks - 同步任务中包含的tasks。

#### 分析

接下来我们对于上面问题中的代码进行分析：

1. 首先选出所有的同步代码，可以得到b、c（注意Promise的then才是微任务）；
2. 其次选出所有的microtasks，可以得到e；
3. 最后选出所有的tasks，就是a和d了，但是可以看到延迟时间d比较短为0，所以应该是d、a的顺序；

最终得到的结果就是bceda。

但是，结果真的是这样吗？不是，应该是bcead，那么为什么会这样，难道是分析错了吗？分析没有错误，但是对于`setTimeout` 延迟时间的概念存在一些遗漏，延迟时间的设定存在一个最小有效值，小于有效值都被等同于0来处理，即指定回调函数排入后续事件循环中执行，出现和分析结果不一致的情况就是因为两个定时器都被认为入参为0来处理了，那么先设定的定时器自然就在前执行，后设定的在后执行。[MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_throttled_to_%E2%89%A5_4ms)文中指出 **`once every 4 ms`**，具体我没有去深究，不过需要知道这个知识点。

## Link

+ [上一篇：**改变上下文指向 —— call (DIY)**](../DIY/call.md)