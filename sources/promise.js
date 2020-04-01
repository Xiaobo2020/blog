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
  let alreadyTransition = false;
  const testRunner = (handler) => {
    if (!alreadyTransition) {
      alreadyTransition = true;
      handler();
    }
  }
  if (promise2 === x) {
    reject(new TypeError(x));
  } else if (x instanceof CPromise || x instanceof Promise) {
    x.then(
      v => promiseResolutionProcedure(promise2, v),
      r => reject(r),
    );
  } else if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            testRunner(() => promiseResolutionProcedure(promise2, y))
          },
          r => {
            testRunner(() => reject(r));
          },
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      testRunner(() => reject(e));
    }
  } else {
    resolve(x);
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
