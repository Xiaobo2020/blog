Array.prototype.myForEach = function (fn, ctx = this) {
  for (let i = 0; i < this.length; i++) {
    fn.call(ctx, this[i], i, this);
  }
};