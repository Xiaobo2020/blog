/**
 * 整数转罗马数字
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
  const dict = {
    [1]: 'I',
    [5]: 'V',
    [10]: 'X',
    [50]: 'L',
    [100]: 'C',
    [500]: 'D',
    [1000]: 'M',
    [4]: 'IV',
    [9]: 'IX',
    [40]: 'XL',
    [90]: 'XC',
    [400]: 'CD',
    [900]: 'CM',
  };
  return Object.keys(dict).reverse().reduce((acc, cur) => {
    const v = parseInt(cur);
    if (num < v) {
      return acc;
    }
    const count = Math.floor(num / v);
    let s = '';
    for (let i = 0; i < count; i++) {
      s = s + dict[v];
    }
    num = num % v;
    return acc + s;
  }, '');
};

var intToRoman2 = function (num) {

  const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const roms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let ret = '';
  for (let i = 0; i < 13;) {
    if (num >= nums[i]) {
      num -= nums[i];
      ret += roms[i];
    } else {
      i++;
    }
  }
  return ret;
}