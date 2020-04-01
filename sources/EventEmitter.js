function EventEmitter () {
  const _events = {};
  this.on = function (event, fn) {
    if (Array.isArray(event)) {
      // multi events handler
      for (let i = 0; i < event.length; i++) {
        this.on(event[i], fn);
      }
    } else {
      // single event handler
      (_events[event] || (_events[event] = [])).push(fn);
    }
  }
  this.emit = function (event, ...args) {
    const cbs = _events[event];
    if (cbs) {
      for (let i = 0; i < cbs.length; i++) {
        cbs[i](...args);
      }
    }
  };
  this.off = function (event, fn) {
    if (Array.isArray(event)) {
      // multi events handler
      for (let i = 0; i < event.length; i++) {
        this.off(event[i], fn);
      }
      return;
    }
    const cbs = _events[event];
    if (!cbs) {
      // no event
      return;
    }
    // single event handler
    if (!fn) {
      // no fn, clean all
      _events[event] = [];
      return;
    }
    if (fn) {
      // clean extract fn
      _events[event] = _events[event].filter(cb => cb !== fn);
    }
  };
  this.once = function (event, fn) {
    // create a new fn named '_fn'
    const _fn = (...args) => {
      // handle off
      this.off(event, _fn);
      // call origin fn
      fn(...args);
    }
    // add new fn named '_fn'
    this.on(event, _fn);
  };
}