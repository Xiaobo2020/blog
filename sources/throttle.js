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