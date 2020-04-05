function debounce (handler, delay) {
  let timerId;
  return function (...args) {
    timerId = clearTimeout(timerId);
    timerId = setTimeout(() => {
      handler.apply(this, args);
    }, delay);
  }
}
