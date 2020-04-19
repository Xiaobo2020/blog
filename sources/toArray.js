function toArray (arrayLike, type) {
  if (type === 1) {
    // 1. slice + call/apply
    return Array.prototype.slice.call(arrayLike);
    // return Array.prototype.slice.apply(arrayLike);
  } else if (type === 2) {
    // 2. Array.from
    return Array.from(arrayLike);
  } else if (type === 3) {
    // 3. concat + apply
    return Array.prototype.concat.apply([], arrayLike);
  } else {
    // 4. splice + call，会对原对象处理
    return Array.prototype.splice.call(arrayLike, 0);
  }
}

const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
};

for (let i = 1; i <= 4; i++) {
  console.log(toArray(arrayLike, i), arrayLike);
}
