function CPromise (executor) {
  this.status = 'pending';
  this.data;
  this.listeners = [];

  const transition = (status) => (data) => {
    if (this.status === 'pending') {
      // 一次性状态翻转
      this.status = status;
      this.data = data;
      for (let i = 0; i < this.listeners.length; i++) {
        this.listeners[i]();
      }
    }
  };
  const resolve = transition('fulfilled');
  const reject = transition('rejected');

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

const procedureGenerator = (resolve, reject) => (promise2, x) => {
  const promiseResolutionProcedure = procedureGenerator(resolve, reject);
  if (promise2 === x) {
    throw new TypeError(x);
  } else if (x instanceof CPromise) {
    x.then(resolve, reject);
  } else if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    const then = x.then;
    if (typeof then === 'function') {
      then.call(
        x,
        y => {
          promiseResolutionProcedure(promise2, y);
        },
        r => {
          reject(r);
        },
      )
    } else {
      resolve(x);
    }
  } else {
    resolve(x)
  }
};

CPromise.prototype.then = function (onResolve, onReject) {
  const onFulfilled = typeof onResolve === 'function' ? onResolve : v => v;
  const onRejected = typeof onReject === 'function' ? onReject : r => {throw r};

  const promise2 = new CPromise((resolve, reject) => {
    const promiseResolutionProcedure = procedureGenerator(resolve, reject);
    const fn = () => {
      setTimeout(() => {
        try {
          const x = this.status === 'fulfilled' 
            ? onFulfilled(this.data) 
            : onRejected(this.data);
          promiseResolutionProcedure(promise2, x);
        } catch (e) {
          reject(e);
        }
      }, 0);
    };
    if (this.status === 'pending') {
      this.listeners.push(fn);
    } else {
      fn();
    }
  });

  return promise2;
};

module.exports = CPromise;
