/**
 * @description 简版的Promise实现
 * @function then
 * @function resolve
 * @function reject
 * @function all
 */
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function SPromise (executor) {
  this._status = PENDING;
  this._value = undefined;
  this._listeners = [];
  const resolve = (value) => {
    if (this._status === PENDING) {
      this._status = RESOLVED;
      this._value = value;
      for (let i = 0; i < this._listeners.length; i++) {
        this._listeners[i]();
      }
    }
  };
  const reject = (reason) => {
    if (this._status === PENDING) {
      this._status = REJECTED;
      this._value = reason;
      for (let i = 0; i < this._listeners.length; i++) {
        this._listeners[i]();
      }
    }
  };
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

SPromise.prototype.then = function (onResolve, onReject) {
  const resolveHandler = 
    typeof onResolve === 'function' ? onResolve : v => v;
  const rejectHandler = 
    typeof onReject === 'function' ? onReject : v => {
      throw(r);
    };

  return new SPromise((resolve, reject) => {
    const task = () => {
      try {
        const x = 
          this._status === RESOLVED 
            ? resolveHandler(this._value) 
            : rejectHandler(this._value);
        resolve(x);
      } catch (e) {
        reject(e);
      }
    };
    if (this._status === PENDING) {
      this._listeners.push(task);
    } else {
      task();
    }
  });
}

SPromise.resolve = function (value) {
  return new SPromise((resolve, reject) => {
    resolve(value);
  })
};

SPromise.reject = function (reason) {
  return new SPromise((resolve, reject) => {
    reject(reason);
  })
};

SPromise.all = function (tasks) {
  if (!Array.isArray(tasks)) {
    return SPromise.reject('期望参数为数组');
  }
  const result = [];
  let count = 0;
  return new SPromise((resolve, reject) => {
    // 判断数组方法
    for (let i = 0; i < tasks.length; i++) {
      SPromise.resolve(tasks[i]).then(
        v => {
          result[i] = v;
          count++;
          if (count === tasks.length) {
            resolve(result);
          }
        },
        r => {
          reject(r);
        },
      );
    }
  });
};

const fn = (v) => new Promise((resolve, reject) => {
  if (v) {
    setTimeout(() => {
      resolve(v);
    }, 1000 * v);
  } else {
    reject(0);
  }
});

SPromise.all([
  fn(3),
  fn(1),
  fn(2),
]).then(
  v => {console.log('then1', v)},
  r => {
    console.log('catch1', r);
    return r;
  },
).then(
  v => {console.log('then2', v)},
  r => {console.log('catch2', r)},
)