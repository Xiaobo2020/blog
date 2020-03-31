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
      let v;
      try {
        v = onfulfilled(this.value);
        if (v instanceof CPromise || v instanceof Promise) {
          return v;
        } else {
          return new CPromise((resolve, reject) => resolve(v));
        }
      } catch (e) {
        return new CPromise((resolve, reject) => reject(e));
      }
    } else {
      return new CPromise((resolve, reject) => resolve(this.value));
    }
  } else if (this.status === 'rejected') {
    if (typeof onrejected === 'function') {
      let r;
      try {
        r = onrejected(this.reason);
        if (r instanceof CPromise || r instanceof Promise) {
          return r;
        } else {
          return new CPromise((resolve, reject) => resolve(r));
        }
      } catch (e) {
        return new CPromise((resolve, reject) => reject(e));
      }
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
  resolve(1);
});

promise
  .then(
    (res) => {
      console.log('onfulfilled1', res);
      return new Promise((resolve, reject) => reject('Hello'));
    },
    (err) => console.log('onrejected1', err)
  )
  .then(
    res => console.log('onfulfilled2', res),
    err => {
      console.log('onrejected2', err);
      return new CPromise((resolve, reject) => reject('World'));
    }
  )
  .then(
    res => console.log('onfulfilled3', res),
    err => console.log('onrejected3', err),
  );

// onfulfilled1 1
// onrejected2 Hello
// onrejected2 World