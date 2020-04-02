// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""。

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  // 没有字符串或只有一个字符串
  if (strs.length <= 1) {
    return strs[0] || '';
  }

  // 找出最短字符串
  let minStr = strs[0];
  let minLen = minStr.length;
  for (let i = 1; i < strs.length; i++) {
    if (strs[i].length < minLen) {
      minStr = strs[i];
      minLen = strs[i].length;
    }
  }
  let isSame = true;
  return minStr.split('').filter((c, index) => {
    if (!isSame) {
      return '';
    }
    for (let i = 0; i < strs.length; i++) {
      if (c !== strs[i][index]) {
        isSame = false;
        return '';
      }
    }
    return c;
  }).join('');
};

var longestCommonPrefix2 = function(strs) {
  if (strs.length === 0) {
    return '';
  }
  let str = strs[0];
  let i = 0;
  for (; i < str.length; i++) {
    const tag = strs.reduce((isSame, c) => {
      return isSame && str[i] === c[i];
    }, true);
    if (!tag) {
      break
    }
  }
  return str.slice(0, i);
}

const strs = ["flower","flow","flight"];

console.log(longestCommonPrefix2(strs));