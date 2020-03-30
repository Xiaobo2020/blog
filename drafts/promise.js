function CPromise (executor) {
  this.status = 'pending';
  this.value;
  this.reason;

  const resolve = (v) => {
    if (this.status === 'pending') {
      this.status = 'fulfilled';
      this.value = v;
    }
  };

  const reject = (r) => {
    if (this.status === 'pending') {
      this.status = 'rejected';
      this.reason = r;
    }
  };

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

CPromise.prototype.then = function (onfulfilled, onrejected) {
  if (this.status === 'fulfilled') {
    if (typeof onfulfilled === 'function') {
      return new CPromise((resolve, reject) => {
        try {
          const v = onfulfilled(this.value);
          resolve(v);
        } catch (e) {
          reject(e);
        }
      });
    } else {
      return new CPromise((resolve, reject) => resolve(this.value));
    }
  } else if (this.status === 'rejected') {
    if (typeof onrejected === 'function') {
      return new CPromise((resolve, reject) => {
        try {
          const v = onrejected(this.reason);
          resolve(v);
        } catch (e) {
          reject(e);
        }
      });
    } else {
      return new CPromise((resolve, reject) => reject(this.reason));
    }
  } else {
    // TODO
    console.log('pending');
    return new CPromise((resolve, reject) => {
      
    });
  }
};

const promise = new CPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

promise
  .then(
    (res) => {
      console.log('onfulfilled1', res);
      throw new Error('123');
    },
    (err) => {
      console.log('onrejected1', err)
    }
  )
  .then(
    res => console.log('onfulfilled2', res),
    err => console.log('onrejected2', err),
  );