function throttling (handler, wait) {
  let timerId;
  return function (...args) {
    if (timerId) {
      return;
    }
    handler.apply(this, args);
    timerId = setTimeout(() => {
      timerId = undefined;
    }, wait);
  }
}

// 创建一个节流的click函数
const click = throttling(function (text) {
  console.log('click', text);
}, 1000);

click('first');
click('second');
setTimeout(() => {
  click('third after 1500ms');
}, 1500);
// click first
// click third after 1500ms
