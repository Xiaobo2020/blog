## for ... in

> 2020.03.15

### Syntax

```javascript
for (variable of object) {
  // statement ...
}
```

+ `variable` 可枚举的属性名
+ `object` 非Symbol类型的可枚举属性被迭代的对象

### Description

循环遍历可枚举属性，包括原型链上的可枚举属性。需要注意的是获取到的属性是无序的，因为其次序可能发生变化


### Example

#### 常规对象属性
先来看个最简单的例子
```javascript
// example 1
var obj = {
  a: 'Hello',
  b: 'World',
};
console.log(obj.a); // Hello
console.log(obj.b); // World
for (let key in obj) {
  console.log(key, obj[key]);
  // a Hello
  // b World
}
```

然后将默认可枚举的 `obj.a` 属性用 `Object.defineProperty` 重新定义一下
```javascript
// example 2
var obj = {
  a: 'Hello',
  b: 'World',
}
Object.defineProperty(obj, 'a', {
  enumerable: false, // obj.a变为不可枚举
});
console.log(obj.a); // Hello
console.log(obj.b); // World
for (let key in obj) {
  console.log(key, obj[key]);
  // b World
}
```

#### 原型链上的属性
再来看看原型链的例子
```javascript
// example 3
function Person (name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  console.log(`Hi, i am ${this.name}.`);
};
const person = new Person('Kafffka');
person.sayHi(); // Hi, i am Kafffka.
for (let i in person) {
  console.log(i, person[i]);
  // name Kafffka
  // sayHi function () {
  //   console.log(`Hi, i am ${this.name}.`);
  // }
}
```

如果对于原型链上的属性做不可枚举定义
```javascript
// example 4
function Person (name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  console.log(`Hi, i am ${this.name}.`);
};
Object.defineProperty(
  Person.prototype, // 原型链对象
  'sayHi', // sayHi属性
  {
    enumerable: false, // 不可枚举
  }
);
const person = new Person('Kafffka');
person.sayHi(); // Hi, i am Kafffka.
for (let i in person) {
  console.log(i, person[i]);
  // name Kafffka
}
```
这里多说一句，如果想要过滤自身的属性而不包括原型，可以执行 `obj.hasOwnProperty(key)` 或者使用 `Object.getOwnPropertyNames(obj)` 来确定属性是否是自身的。

#### 属性被访问次序

我们利用 `delete` 这个删除属性的运算符来对 *example 1* 做一些修改
```javascript
// example 5

function traversal (obj) {
  // 因为会用到多次，直接定义为函数减少重复
  for (let key in obj) {
    console.log(key, obj[key]);
  }
}
var obj = {
  a: 'Hello',
  b: 'World',
};
traversal(obj);
// a Hello
// b World

delete obj.a; // 删除 obj.a 属性
traversal(obj);
// b World

obj.a = 'Hello'; // 对 obj.a 重新定义
traversal(obj);
// b World
// a Hello

obj.b = 'World2'; // 对 obj.b 重新赋值
traversal(obj);
// b World2
// a Hello
```
可以看到在使用 `delete` 运算符操作后，遍历获得的属性次序发生了变化，而对于已有属性进行赋值操作并不能改变次序。如果稍微做一下总结，可以大致分为以下几点，感兴趣的可以一一去实践一下：

1. `delete` 运算符可以改变属性被迭代访问的次序；
2. 如果一个属性在一次迭代中被修改，在稍后迭代被访问，其在循环中的值是在稍后时间的值；
3. 如果一个属性在被访问前被删除，不会在之后被访问；
4. 在迭代进行中添加的属性，在稍后迭代中可能被访问，可能被忽略；

### Array and for...in

数组索引只是具有整数名称的可枚举属性，在 `for...in` 迭代看来其实与通用对象属性相同，所以会循环得到所有的可枚举属性，不仅仅为索引，同时由于上节例子中见到的次序问题，`for...in` 不能保证按照索引理想顺序输出，所以不建议数组使用 `for...in`。

## Link

+ [下一篇：**forEach (DIY)**](../DIY/forEach.md)