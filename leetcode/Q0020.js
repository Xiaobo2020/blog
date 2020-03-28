// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (s.length % 2 === 1) {
    return false;
  }
  const dict = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  const stack = [];
  const ret = s.split('').reduce((acc, cur) => {
    if (!acc) {
      // 已经确定不匹配
      return acc;
    }
    if (cur === '(' || cur === '[' || cur === '{') {
      // 进栈
      stack.push(cur);
      return acc;
    } else {
      // 出栈校验
      return dict[stack.pop()] === cur;
    }
  }, true);
  return ret && stack.length === 0;
};

var isValid2 = function (s) {
  let prevS = s;
  s = s.replace(/\{\}|\[\]|\(\)/g, '');
  while(s !== prevS) {
    prevS = s;
    s = s.replace(/\{\}|\[\]|\(\)/g, '');
  }
  return s.length === 0;
}

var isValid = function (s){
  const len = s.length;
  if (len % 2) return false;
  const stack = [];
  const dict = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  for (let i = 0; i < len; i++) {
    switch(s[i]) {
      case '(':
      case '[':
      case '{':
        stack.push(s[i]);
        break;
      case ')':
      case ']':
      case '}':
        if (dict[stack.pop()] !== s[i]) return false;
        break;
    }
  }
  return stack.length === 0;
}