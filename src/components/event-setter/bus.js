import EventEmitter from 'bcore/event'

const __spreadArrays = function () {
  for (var e = 0, t = 0, n = arguments.length; t < n; t++) {
    e += arguments[t].length
  }
  for (var r = Array(e), i = 0, t = 0; t < n; t++) {
    for (let o = arguments[t], a = 0, s = o.length; a < s; a++, i++) {
      r[i] = o[a]
    }
  }
  return r
}
let emitter = ''
/**
 * @return {string}
 */
function Bus() {
  return emitter || (emitter = this, void (this.emitter = new EventEmitter()))
}

Bus.prototype.getEmitter = function () {
  return this.emitter
}

Bus.prototype.on = function (eventType, callback) {
  return this.sub(eventType, callback)
}

Bus.prototype.off = function (evetType, callback) {
  return this.unsub(evetType, callback)
}

Bus.prototype.emit = function (event) {
  for (var ret = [], i = 1; i < arguments.length; i++) ret[i - 1] = arguments[i]
  return this.pub.apply(this, __spreadArrays([event], ret))
}

Bus.prototype.sub = function (event, callback) {
  const self = this
  return this.emitter.on(event, callback),
  function () {
    self.emitter.removeListener(event, callback)
  }
}

Bus.prototype.once = function (event, callback) {
  const self = this
  return this.emitter.once(event, callback),
  function () {
    self.emitter.removeListener(event, callback)
  }
}

Bus.prototype.unsub = function (event, callback) {
  callback ? this.emitter.removeListener(event, callback) : this.emitter.removeAllListeners(event)
}

Bus.prototype.pub = function (event) {
  for (var t, n = [], i = 1; i < arguments.length; i++) {
    n[i - 1] = arguments[i]
  }
  return (t = this.emitter).emit.apply(t, __spreadArrays([event], n))
}

Bus.prototype.removeListener = function (event, callback) {
  return this.emitter.removeListener(event, callback)
}

export default Bus
