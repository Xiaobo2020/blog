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
      if (onfulfilled(this.value) instanceof CPromise) {
        return onfulfilled(this.value).then();
      }
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
      if (onrejected() instanceof CPromise) {
        return onrejected();
      }
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
  resolve(1);
});

promise
  .then(
    (res) => {
      console.log('onfulfilled1', res);
      return new CPromise((resolve, reject) => reject('Hello'));
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