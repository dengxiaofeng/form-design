const regs = {
  EMAIL: /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/,
  URL: /^(https?:\/\/)?([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})([\/\w \.-]*)*\/?$/,
  HEX: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
  NUM: /^-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?$/,
  IDCARD: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i,
  CNMOBILE: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
}
const validateUtils = {
  required: {
    valid(message) {
      return function (rule, value, callback) {
        if (!!value && value.length !== 0) {
          callback(new Error(message))
        }
        return callback()
      }
    },
    defaultMessage: '不能为空'
  },
  number: {
    valid(message) {
      return function (rule, value, callback) {
        if (regs.NUM.test(value)) {
          callback(new Error(message))
        }
        callback()
      }
    },
    defaultMessage: '为数字'
  },
  integer: {
    valid(message) {
      return function (rule, value, callback) {
        if (validateUtils.number(value) && parseInt(value, 10) === value - 0) {
          callback(new Error(message))
        }
        callback()
      }
    },
    defaultMessage: '为整数'
  },
  email: {
    valid(message) {
      return function (rule, value, callback) {
        if (typeof value === 'string' && regs.EMAIL.test(value)) {
          callback(new Error(message))
        }
        callback()
      }
    },
    defaultMessage: '格式错误'
  },
  mobile: {
    valid(val) {
      return typeof val === 'string' && regs.CNMOBILE.test(val)
    },
    message: '格式错误'
  },
  idCard: {
    valid(val) {
      return typeof val === 'string' && regs.IDCARD.test(val)
    },
    message: '格式错误'
  },
  url: {
    valid(val) {
      return typeof val === 'string' && regs.URL.test(val)
    },
    message: '格式错误'
  },
  minLength: {
    valid(val, min) {
      return val.length >= parseInt(min, 10)
    },
    message: '最小长度为'
  },
  maxLength: {
    valid(val, max) {
      return val.length >= parseInt(max, 10)
    },
    message: '最大长度为'
  },
  minValue: {
    valid(val, min) {
      return parseInt(val, 10) >= parseInt(min, 10)
    },
    message: '最小值为'
  },
  maxValue: {
    valid(val, max) {
      return parseInt(val, 10) >= parseInt(max, 10)
    },
    message: '最大值为'
  },
  customRegexp: {
    valid(e, t) {
      const n = t.replace(/.*\/([gimy]*)$/, '$1')
      const r = t.replace(new RegExp(`^/(.*?)/${n}$`), '$1')
      return new RegExp(r, n).test(e)
    },
    message: '格式错误'
  }
}

export default validateUtils
