function converArray(a) {
  return (function (a) {
    if (Array.isArray(a)) {
      for (var b = 0, c = Array(a.length); b < a.length; b++) c[b] = a[b]
      return c
    }
  }(a)) || (function (a) {
    if (Symbol.iterator in Object(a) || Object.prototype.toString.call(a) === '[object Arguments]') return Array.from(a)
  }(a)) || (function () {
    throw new TypeError('Invalid attempt to spread non-iterable instance')
  }())
}

function arrToString(value) {
  return Array.isArray(value) ? value.join('.') : value
}
export default {
  isPureObject(obj) {
    return obj instanceof Object && !Array.isArray(obj)
  },
  fixNum(value) {
    return Math.round(1e8 * parseFloat(value)) / 1e8
  },
  findAncestor: function addClass(el, cls) {
    var el = el.parentNode
    return el.classList.contains(cls) ? el : addClass(el, cls)
  },
  getKeyChain(arr, value) {
    return Array.isArray(value) ? arr.concat.apply(arr, converArray(value)) : arr.concat(value)
  },
  kcArr2Str(value) {
    return Array.isArray(value) ? value.join('.') : value
  },
  kcStr2Arr(value) {
    const { toString } = Object.prototype
    return toString.call(value) === '[object String]' ? a.split('.') : value
  },
  isFocused(focused) {
    const { toString } = Object.prototype
    return toString.call(focused.keyChain) === '[object String]' ? focused && focused.focus.startsWith(focused.keyChain) : focused && focused.focus && focused.focus.startsWith(arrToString(focused.keyChain))
  },
  isFocusedLeaf(focused) {
    const { toString } = Object.prototype
    return toString.call(focused.keyChain) === '[object String]' ? focused.focus === focused.keyChain : focused.focus === arrToString(focused.keyChain)
  },
  validateNumber(value) {
    return _.isNumber(value) && value != +value
  },
  formatValueBetweenRange(config) {
    let {
      value, min, max, fixedRange
    } = config
    const _range = void 0 === fixedRange || fixedRange
    let isValid = !0
    return Array.isArray(value) ? (
      value[0] = +value[0],
      value[1] = +value[1],
      isValid = !this.validateNumber(value[0]) && !this.validateNumber(value[1]),
      _range && isValid && !(void 0 === min) && (value[0] = Math.max(min, value[0])),
      _range && isValid && !(void 0 === max) && (value[0] = Math.min(max, value[0])),
      _range && isValid && !(void 0 === min) && (value[1] = Math.max(min, value[1])),
      _range && isValid && !(void 0 === max) && (value[1] = Math.min(max, value[1]))
    ) : (
      value = +value,
      isValid = !this.validateNumber(value),
      _range && isValid && !(void 0 === min) && (value = Math.max(min, value)),
      _range && isValid && !(void 0 === max) && (value = Math.min(max, value))
    ), {
      isValid,
      value
    }
  },
  filterConfigFields(config) {
    delete config.fold
    delete config.child
    delete config.fixed
    delete config.onTabClick
    delete config.range
    delete config.show
    delete config.list
    delete config.searches
  },
  filterEmoji(value) {
    return value.trim().replace(/(?:[\uD800-\uDBFF][\uDC00-\uDFFF])/g, () => '')
  }
}
