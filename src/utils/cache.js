import Prefixer from 'inline-style-prefixer'

const prefixer = new Prefixer()
const isIE = (function (callback) {
  let val = void 0
  return function () {
    return val == null && (val = callback()), val
  }
}(() => /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())))
const head = (function (callback) {
  let val = void 0
  return function () {
    return val == null && (val = callback()), val
  }
}(() => document.head || document.getElementsByTagName('head')[0]))
let node = null
const appendChild = function (node) {
  head().appendChild(node)
}
const removeChild = function () {
  node && (node.parentNode.removeChild(node), node = null)
}
const createStyleElement = function () {
  const elementName = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ''
  const label = document.createElement('style')
  label.type = 'text/css'
  label.setAttribute('from', elementName)
  appendChild(label)
  return label
}

const createRootElement = function (css) {
  removeChild()
  node = createStyleElement('render-engine')
  node.styleSheet ? node.styleSheet.cssText = css : node.appendChild(document.createTextNode(css))
}

const transformNode = function (element, className) {
  return element.toLowerCase() + className.replace('node_', '-')
}

let i = 0
const cssFilter = []
function filterProperty(index, property) {
  cssFilter[index] = property
  return cssFilter.filter(Boolean).join('\n')
}
const exec = function (element) {
  const reg = /^\.(.*)$/.exec(element)
  return reg ? reg[1] : null
}

function callback(e) {
  let fn = void 0
  return function () {
    return fn == null && (fn = e()), fn
  }
}

const getHead = callback(() => document.head || document.getElementsByTagName('head')[0])
const createCss = (function () {
  function Css() {
    this.cssCollection = []
    this.readyTask = []
    this.isReady = !1
    getHead() && this.prepare()
  }
  Css.prototype.setNamespace = function () {

  }
  Css.prototype.setDesignMode = function (val) {
    this.designMode = val
  }
  Css.prototype.isDesignMode = function (val) {
    return this.designMode
  }
  Css.prototype.prepare = function () {
    this.isReady = !0
    const { documentElement } = document
    documentElement.id || (documentElement.id = `rehtml-${(+new Date()).toString(36)}`)
    this.namespaces = `#${documentElement.id}`
    for (let ret = void 0; (ret = this.readyTask.shift()) != null;) ret()
  }

  Css.prototype.createCss = function (selector, property) {
    if (!property) {
      return ''
    }
    if (this.namespace && selector[0] === '.' && (selector = `${this.namespace} ${selector}`),
    {}.toString.call(property) === '[object String]') return /:root/gi.test(property) ? property.replace(/:root/gi, selector) : `${selector}{${property}}`
    return `${selector}{${transformCss(property)}}`
  }
  Css.prototype.addCssText = function (css) {
    const index = this.cssCollection.indexOf(css)
    index < 0 && this.cssCollection.push(css)
  }

  Css.prototype.clearCollection = function () {
    this.cssCollection = []
  }
  Css.prototype.collectStyle = function (element, className, schme) {
    const cls = transformNode(element, className)
    schme.className = cls
    schme.style ? this.addCssText(this.createCss(`.${cls}`, schme.style)) : schme.containerStyle && this.addCssText(this.createCss(`.${cls}`, schme.containerStyle))
    schme.itemStyle && this.addCssText(this.createCss(`.${cls}-item`, schme.itemStyle))
    schme.pageStyle && this.addCssText(this.createCss('body', schme.pageStyle))
  }

  Css.prototype.applyStyle = function () {
    const cssCollection = this.cssCollection.join('\n')
    this.ready(() => createRootElement(cssCollection))
  }
  Css.prototype.removeStyle = function () {
    return removeChild(), this
  }
  Css.prototype.ready = function (callback) {
    return this.isReady ? void callback() : void this.readyTask.push(callback)
  }

  Css.prototype.createStyleElement = function (element) {
    return createStyleElement(element)
  }
  return Css
}())
const cssUtil = new createCss()
const singletonUtils = (function () {
  function StyleSheet() {
    this.index = i++
    this.styleElement = cssUtil.createStyleElement('style-sheet')
  }
  StyleSheet.prototype.write = function (css) {
    const { index } = this
    if (this.styleElement.styleSheet) {
      this.styleElement.styleSheet.cssText = filterProperty(index, css)
    } else {
      const text = document.createTextNode(css)
      const { childNodes } = this.styleElement
      childNodes[index] && this.removeChild(childNodes[index])
      childNodes.length ? this.styleElement.insertBefore(text, childNodes[index]) : this.styleElement.appendChild(text)
    }
  }
  StyleSheet.prototype.remove = function () {
    this.write('')
  }
}())
const styleUtils = (function () {
  function StyleSheet() {
    this.styleElement = cssUtil.createStyleElement('style-sheet')
  }

  StyleSheet.prototype.write = function (css) {
    const { styleElement } = this
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = css
    } else {
      for (;styleElement.firstChild;) {
        styleElement.removeChild(styleElement.firstChild)
      }
      styleElement.appendChild(document.createTextNode(css))
    }
  }
  StyleSheet.prototype.remove = function () {
    const { styleElement } = this
    styleElement.parentNode.removeChild(styleElement)
  }
  return StyleSheet
}())
function o(e) {
  return e.replace(/[-\s]+(.)?/g, (e, t) => (t ? t.toUpperCase() : ''))
}
const l = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (e) {
  return typeof e
}
  : function (e) {
    return e && typeof Symbol === 'function' && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e
  }

const keyFrame = ['animation', 'columnCount', 'columns', 'fontWeight', 'opacity', 'order', 'zIndex', 'zoom', 'flex', 'boxFlex', 'transform', 'perspective', 'boxPack', 'boxAlign', 'colspan', 'rowspan', 'lineHeight', 'WebkitLineClamp']
function u(e) {
  const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ''
  const n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
  let r = void 0
  let i = void 0
  let c = void 0
  for (r in e) {
    a(e, r) && (i = e[r],
    c = o(t ? t + r : r),
    i != null && c != null && c !== '' && ((typeof i === 'undefined' ? 'undefined' : l(i)) !== 'object' ? (s(i) && keyFrame.indexOf(c) < 0 && (i += 'px'),
    n[c] = i) : u(i, `${c}-`, n)))
  }
  return n
}
function a(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t)
}
function s(e) {
  const t = typeof e === 'undefined' ? 'undefined' : l(e)
  return t === 'number' || t === 'string' && e !== '' && 1 * e == e
}
const transformCss = function (element) {
  const t = prefixer.prefix(u(element))
  const n = []
  let r = void 0
  for (r in t) a(t, r) && n.push(`${i(r)}:${t[r]}`)
  return n.join(';')
}
const styleSheet = (function () {
  function Cache() {
    this.maps = {}
    this.precache = {}
    this.ready = !1
    this.isSingleton = isIE()
    cssUtil.ready(() => this.prepare())
  }
  Cache.prototype.setDesignMode = function (val) {
    cssUtil.setDesignMode(val)
  }
  Cache.prototype.setNamespace = function (name) {
    cssUtil.setNamespace(name)
  }
  Cache.prototype.prepare = function () {
    this.ready = !0
    for (const key in this.precache) {
      this.precache.hasOwnProperty(key) && this.write(key, this.precache[key])
    }
    this.precache = null
  }

  Cache.prototype.cache = function (key, value) {
    this.precache[key] = value
  }

  Cache.prototype.write = function (key, value) {
    if (!value) {
      return void this.remove(key)
    }
    this.getStorage(key).write(value)
  }

  Cache.prototype.getStorage = function (key) {
    this.maps[key] || (this.maps[key] = this.isSingleton ? new singletonUtils() : new styleUtils())
    return this.maps[key]
  }

  Cache.prototype.remove = function (key) {
    const map = this.maps[key]
    map && (map.remove(), this.maps[key] = null)
  }

  Cache.prototype.clear = function () {
    if (this.ready) {
      for (const key in this.maps) {
        this.maps.hasOwnProperty(key) && this.remove(key)
      }
    } else {
      this.precache = {}
    }
  }

  Cache.prototype.invoke = function (element, classList, n) {
    if (n && !cssUtil.isDesignMode()) {
      return n
    }

    if (!classList) {
      return null
    }
    const css = cssUtil.createCss(element, classList)
    this.ready ? this.write(element, css) : this.cache(element, css)
    return exec(element)
  }

  return Cache
}())

window.__visionStyleSheet || (window.__visionStyleSheet = new styleSheet())

export default new styleSheet()
