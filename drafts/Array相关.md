## Array

### 判断数组类型

```javascript
function checkArrayType (array) {
  // instanceof - 松散
  // isPrototypeOf - 松散
  // isArray - 严格
  // toString - 严格
  return (
    array instanceof Array && 
    Array.prototype.isPrototypeOf(array) && 
    Array.isArray(array) && 
    Object.prototype.toString.call(array) === '[object Array]'
  );
}
```

### 类数组对象转换为数组


#### 定义

类数组对象指拥有一个 length 属性和若干索引属性的对象，如

```javascript
const array = [1, 2, 3, 4];
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
};
```

#### 实现

```javascript
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
```