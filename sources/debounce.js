function debounce (handler, delay) {
  let timerId;
  return function (...args) {
    timerId = clearTimeout(timerId);
    timerId = setTimeout(() => {
      handler.apply(this, args);
    }, delay);
  }
}

// 创建一个防抖的check函数
const check = debounce(function (inputValue) {
  console.log('check', inputValue);
}, 1000);

check('first');
check('second');
setTimeout(() => {
  check('third after 1500ms');
}, 1500);
// check second
// check third after 1500ms
