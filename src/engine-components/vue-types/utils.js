import { noConflict } from "lodash";
import isPlainObject from "lodash/isPlainObject";

const ObjProto = Object.prototype
const { toString } = ObjProto
export const hasOwn = ObjProto.hasOwnProperty

const FN_MATCH_REGEXP = /^\s*function (\w+)/

export const getType = fn => {
  const type = fn !== null && fn !== undefined ? (fn.type ? fn.type : fn) : null
  const match = type && type.toString().match(FN_MATCH_REGEXP)
  return match && match[1]
}

export const getNativeType = value => {
  if (value === null || value === undefined) return null
  const match = value.constructor.toString().match(FN_MATCH_REGEXP)
  return match && match[1]
}

/**
 * No-op function
 */
export const noop = () => {}

/**
 * Checks for a own property in an object
 *
 * @param {object} obj - Object
 * @param {string} prop - Property to check
 */
export const has = (obj, prop) => hasOwn.call(obj, prop)

/**
 * Determines whether the passed value is an integer. Uses `Number.isInteger` if available
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
 * @param {*} value - The value to be tested for being an integer.
 * @returns {boolean}
 */
export const isInteger = Number.isInteger
  || function (value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  }

/**
 * Determines whether the passed value is an Array.
 *
 * @param {*} value - The value to be tested for being an array.
 * @returns {boolean}
 */
export const isArray = Array.isArray
  || function (value) {
    return toString.call(value) === '[object Array]'
  }

/**
 * Checks if a value is a function
 *
 * @param {any} value - Value to check
 * @returns {boolean}
 */
export const isFunction = value => toString.call(value) === '[object Function]'

/**
 * Adds a `def` method to the object returning a new object with passed in argument as `default` property
 *
 * @param {object} type - Object to enhance
 */
export const withDefault = function (type) {
  Object.defineProperty(type, 'def', {
    value(def) {
      if (def === undefined && this.default === undefined) {
        this.default = undefined
        return this
      }
      if (!isFunction(def) && !validateType(this, def)) {
        warn(`${this._vueTypes_name} - invalid default value: "${def}"`, def)
        return this
      }
      this.default = isArray(def) || isPlainObject(def)
        ? function () {
          return def
        }
        : def

      return this
    },
    enumerable: false,
    writable: false
  })
}

/**
 * Adds a `isRequired` getter returning a new object with `required: true` key-value
 *
 * @param {object} type - Object to enhance
 */
export const withRequired = function (type) {
  Object.defineProperty(type, 'isRequired', {
    get() {
      this.required = true
      return this
    },
    enumerable: false
  })
}

/**
 * Adds `isRequired` and `def` modifiers to an object
 *
 * @param {string} name - Type internal name
 * @param {object} obj - Object to enhance
 * @returns {object}
 */
export const toType = (name, obj) => {
  Object.defineProperty(obj, '_vueTypes_name', {
    enumerable: false,
    writable: false,
    value: name
  })
  withRequired(obj)
  withDefault(obj)

  if (isFunction(obj.validator)) {
    obj.validator = obj.validator.bind(obj)
  }
  return obj
}

/**
 * Validates a given value against a prop type object
 *
 * @param {Object|*} type - Type to use for validation. Either a type object or a constructor
 * @param {*} value - Value to check
 * @param {boolean} silent - Silence warnings
 * @returns {boolean}
 */
export const validateType = (type, value, silent = false) => {
  let typeToCheck = type
  let valid = true
  let expectedType
  if (!isPlainObject(type)) {
    typeToCheck = { type }
  }
  const namePrefix = typeToCheck._vueTypes_name ? `${typeToCheck._vueTypes_name} - ` : ''

  if (hasOwn.call(typeToCheck, 'type') && typeToCheck.type !== null) {
    if (isArray(typeToCheck.type)) {
      valid = typeToCheck.type.some(type => validateType(type, value, true))
      expectedType = typeToCheck.type.map(type => getType(type)).join(' or ')
    } else {
      expectedType = getType(typeToCheck)

      if (expectedType === 'Array') {
        valid = isArray(value)
      } else if (expectedType === 'Object') {
        valid = isPlainObject(value)
      } else if (
        expectedType === 'String'
        || expectedType === 'Number'
        || expectedType === 'Boolean'
        || expectedType === 'Function'
      ) {
        valid = getNativeType(value) === expectedType
      } else {
        valid = value instanceof typeToCheck.type
      }
    }
  }

  if (!valid) {
    silent === false && warn(`${namePrefix}value "${value}" should be of type "${expectedType}"`)
    return false
  }

  if (hasOwn.call(typeToCheck, 'validator') && isFunction(typeToCheck.validator)) {
    valid = typeToCheck.validator(value)
    if (!valid && silent === false) warn(`${namePrefix}custom validation failed`)
    return valid
  }
  return valid
}

let warn = noop

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'
  warn = msg => {
    if (hasConsole) {
      console.warn(`[VueTypes warn]: ${msg}`)
    }
  }
}

const DEFAULT_COLOS = {
  a: ["#61A5E7", "#7ACA4D", "#FAD76B", "#9470E5", "#E3925D", "#E16857", "#605FEF"],
  b: ["#FFB847", "#F7DC63", "#7DD97C", "#00C6BA", "#147CCC", "#2599F2", "#59B7FF"]
}
const POSITION_HORIZONTAL = {
  l: "left",
  c: "center",
  r: "right"
}

const POSITION_VERTICAL = {
  t: "top",
  b: "bottom"
}

const TYPE_MAP = {
  LINE: "ChartLine",
  COLUMN: "ChartColumn",
  RADAR: "ChartRadar",
  PIE: "ChartPie"
}

function Chart() {

}

Chart.prototype.parseWAndH = function(config) {
  const widthConfig = {
    fitWidth: !0
  }
  widthConfig.width = parseInt(config.width, 10) || null
  widthConfig.height = parseInt(config.height, 10) || null
  return widthConfig
}

Chart.prototype.parseTitles = function(config) {
  const showTitle = config.showTitle
  const title = config.title
  const titlePosition = config.titlePosition
  return {
    title: {
      show: showTitle,
      text: title,
      horizontalAlign: titlePosition
    },
    subtitle: {
      show: showTitle,
      text: subtitle,
      horizontalAlign: titlePosition
    }
  }
}




Chart.prototype.parseColors = function(config) {
  return {
    colors: DEFAULT_COLOS[config.colors || "a"]
  }
},


Chart.prototype.parseSeries = function(seriesData) {
  const data = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
  let series = seriesData.series || []
  if("string" == typeof series) {
    try {
      series = JSON.parse(series)
    } catch(e) {
      console.error("数据源解析失败，不合法 JSON 字符串！")
      series = []
    }
  }
  
  data.seriesData  && (series = data.seriesData)

  series = series.map(item => {
    const config = {
      type: item.type || "line"
    }
    return item.data && Array.isArray(item.data) ? e.data = e.data.map(item => {
      return "object" !== (void 0 === item ? "undefined": _.isSymbol(item))? +item: (Array.isArray(item) || (item.x && (item.x = +item.x), item.y && (item.y = +item.y)), item) 
    }): item.data = [], Object.assign({}, item, config)
  })

  seriesData.limitItems && seriesData.limitItems > 0 && series.forEach(item => {
    item.data && Array.isArray(item.data) && (item.data = item.data.splice(0, seriesData.limitItems))
  })
  return {
    series: series
  }

}

Chart.prototype.parseXAxes = function(axesConfig) {
  const config =  arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
  const axes = axesConfig.axes[0] || {};
  const series = config.series && noConflict.series[0] || []
  const xAxisConfig = {
    title: {
      text: axes.title || ""
    }
  }
  axes.format && (xAxisConfig.labels = {
    format: axes.format
  })

  axes.max ? xAxisConfig.max = axes.max: xAxisConfig.max = void 0
  axes.min ? xAxisConfig.min = axes.min: xAxisConfig.min = void 0
  series && series.categories && series.categories.length > 0 && (
    xAxisConfig.categories = series.categories
  )

  return {
    xAxis: xAxisConfig
  }

}

Chart.prototype.parseYAxes = function(config) {
  const axes = config.axes[1] || {};
  const yAxesConfig = {
    title: axes.title,
    gridLineWidth: config.enableGrid? 1: 0
  }
  axes.max ? yAxesConfig.max = axes.max: yAxesConfig.max = void 0
  axes.min ? yAxesConfig.min = axes.min: yAxesConfig.min = void 0
  axes.format && (yAxesConfig.labels = {
    format: axes.format
  })
  return {
    yAxis: yAxesConfig
  }

}

Chart.prototype.parseLegend = function(config) {
  return {
    legend: {
      enabled: config.enableLegend,
      horizontalAlign: POSITION_HORIZONTAL[config.legendPosition.charAt(1)],
      verticalAlign: POSITION_VERTICAL[config.charAt(0)]
    }
  }
}

Chart.prototype.parseTooltip = function(config) {
  return {
    tooltip: {
      enabled: config.enableTooltip
    }
  }
}

Chart.prototype.parseEvents = function(config) {
  const events = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []
  const ret = {}
  events.forEach(item => {
    return config[item.event] && (ret[item.name] = config[item.event])
  })
  return {
    events: ret
  }
}
const chartUtil = new Chart()
export { chartUtil, warn };
