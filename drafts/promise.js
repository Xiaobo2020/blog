function CPromise (executor) {
  this.status = 'pending';
  this.data;

  const toggle = (status) => (data) => {
    if (this.status === 'pending') {
      // 一次性状态翻转
      this.status = status;
      this.data = data;
    }
  }
  const resolve = toggle('fulfilled');
  const reject = toggle('rejected');

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 暂时只处理 fulfilled 和 rejected
const nextPromiseGenerator = (data) => (status) => (handler) => {
  if (typeof handler === 'function') {
    let v;
    try {
      v= handler(data);
      if (v instanceof CPromise || v instanceof Promise) {
        return v;
      } else {
        return new CPromise((resolve, reject) => resolve(v));
      }
    } catch (e) {
      return new CPromise((resolve, reject) => reject(e));
    }
  } else {
    return new CPromise((resolve, reject) => {
      if (status === 'fulfilled') {
        resolve(data);
      } else {
        reject(data);
      }
    });
  }
}

CPromise.prototype.then = function (onfulfilled, onrejected) {
  const getNextPromise = nextPromiseGenerator(this.data)(this.status);
  if (this.status === 'fulfilled') {
    return getNextPromise(onfulfilled);
  } else if (this.status = 'rejected') {
    return getNextPromise(onrejected);
  } else {
    // TODO
    console.log('pending');
    return new CPromise((resolve, reject) => {});
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