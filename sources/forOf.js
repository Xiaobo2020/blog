var obj = {
  count: 0,
  next () {
    const value = this.count;
    this.count++;
    return {
      value,
      done: value > 3,
    }
  },
  [Symbol.iterator]: function () {
    return this;
  }
}

for (let v of obj) {
  console.log(v);
}