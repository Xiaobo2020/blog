Function.prototype.myBind = function (ctx, ...args1) {
  const _this = this;
  // 省略对_this的函数类型判断
  return function (...args2) {
    const args = [].concat(args1, args2);
    return _this.apply(ctx, args);
  }
}