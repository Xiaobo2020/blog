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

const checkList = [
  undefined,
  null,
  '',
  'Hello',
  1,
  0,
  NaN,
  true,
  false,
  Symbol(1),
  {},
  () => {},
  [],
  new Array(),
];

const result = checkList.map(v => checkArrayType(v));
console.log(result);