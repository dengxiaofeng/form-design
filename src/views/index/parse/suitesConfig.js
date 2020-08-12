function def(target, key, value) {
  return key in target ? Object.defineProperty(target, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : target[key] = value, target
}
function createObject(obj) {
  for (let i = 1; i < arguments.length; i++) {
    var args = arguments[i] == null ? {} : arguments[i]
    let keys = Object.keys(args)
    typeof Object.getOwnPropertySymbols === 'function' && (keys = keys.concat(Object.getOwnPropertySymbols(args).filter(value => Object.getOwnPropertyDescriptor(args, value).enumerable))),
    keys.forEach(key => {
      def(obj, key, args[key])
    })
  }
  return obj
}

const suiteConfig = {}
suiteConfig.I18N = {
  confirm: '\u786E\u5B9A',
  cancel: '\u53D6\u6D88',
  add: '\u6DFB\u52A0',
  setNewKey: '\u8BF7\u8F93\u5165\u65B0\u7684\u89E6\u53D1\u952E',
  keyboardWarning: '\u4EC5\u652F\u6301\u5355\u952E\u6216\u53CC\u952E\u7EC4\u5408\u7684\u5F62\u5F0F',
  select: '\u8BF7\u9009\u62E9',
  listEmpty: '\u5217\u8868\u4E3A\u7A7A',
  textUrl: '\u6216\u8F93\u5165\u56FE\u7247\u5730\u5740',
  uploading: '\u56FE\u7247\u4E0A\u4F20\u4E2D...',
  deleteImageConfirm: '\u662F\u5426\u5220\u9664\u56FE\u7247',
  notExist: '\u4E0D\u5B58\u5728',
  max: '\u6700\u5927\u503C',
  min: '\u6700\u5C0F\u503C',
  selectOrInput: '\u9009\u62E9\u6216\u8F93\u5165',
  globalColorsFull: '\u5DF2\u6EE1',
  change: '\u66F4\u6539',
  delete: '\u5220\u9664',
  dragFile: '\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u66F4\u6539\u80CC\u666F',
  uploadFail: '\u4E0A\u4F20\u56FE\u7247\u5931\u8D25',
  uploadExceed: '\u56FE\u7247\u8FC7\u5927\uFF0C\u8BF7\u4E0A\u4F20\u5C0F\u4E8E2M\u7684\u56FE\u7247',
  globalColors: '\u5168\u5C40\u8272\u677F',
  recentColors: '\u6700\u8FD1\u4F7F\u7528',
  open: '\u5F00\u542F',
  close: '\u5173\u95ED',
  myPats: '\u6211\u7684\u56FE\u6848',
  recommendedPats: '\u63A8\u8350\u56FE\u6848',
  fontFamily: '\u5B57\u4F53',
  fontWeight: '\u6587\u5B57\u7C97\u7EC6',
  fontSize: '\u5B57\u53F7',
  fontColor: '\u989C\u8272',
  curve: '\u66F2\u7EBF\u7C7B\u578B',
  color: '\u989C\u8272',
  width: '\u7C97\u7EC6',
  style: '\u7C7B\u578B',
  top: '\u9876\u90E8',
  bottom: '\u5E95\u90E8',
  left: '\u5DE6\u4FA7',
  right: '\u53F3\u4FA7',
  smooth: '\u5E73\u6ED1\u66F2\u7EBF',
  polyline: '\u6298\u7EBF'
}
suiteConfig.CONTROL_TYPES_MAP = {
  suite: 'suite',
  font: 'suite',
  line: 'suite',
  margin: 'suite',
  group: 'collection',
  dataSource: 'collection',
  tabs: 'collection',
  menu: 'collection',
  menuchild: 'collection',
  numbers: 'suite',
  iconselects: 'suite',
  array: 'collection'
}

suiteConfig.CONTROL_TYPES = {
  field: ['text', 'select', 'switch'],
  suite: ['suite', 'font', 'margin', 'line', 'numbers', 'iconselects'],
  innerSuite: ['font', 'margin', 'line'],
  collection: ['group', 'tabs', 'menu']
}

suiteConfig.SUITES_CHILDREN = {
  font: {
    fontFamily: {
      caption: '\u5B57\u4F53',
      type: 'select',
      options: [{
        value: 'Microsoft Yahei',
        label: '\u5FAE\u8F6F\u96C5\u9ED1'
      }, {
        value: 'SimSun',
        label: '\u5B8B\u4F53'
      }, {
        value: 'SimHei',
        label: '\u9ED1\u4F53'
      }, {
        value: 'LiSu',
        label: '\u96B6\u4E66'
      }, {
        value: 'fantasy',
        label: 'fantasy'
      }, {
        value: 'cursive',
        label: 'cursive'
      }, {
        value: 'YouYuan',
        label: '\u5E7C\u5706'
      }],
      col: 12
    },
    fontWeight: {
      caption: '\u7C97\u7EC6',
      type: 'select',
      options: [{
        value: 'normal',
        label: 'normal'
      }, {
        value: 'bold',
        label: 'bold'
      }, {
        value: 'bolder',
        label: 'bolder'
      }, {
        value: 'lighter',
        label: 'lighter'
      }, {
        value: 100,
        label: 100
      }, {
        value: 200,
        label: 200
      }, {
        value: 300,
        label: 300
      }, {
        value: 400,
        label: 400
      }, {
        value: 500,
        label: 500
      }, {
        value: 600,
        label: 600
      }, {
        value: 700,
        label: 700
      }, {
        value: 800,
        label: 800
      }, {
        value: 900,
        label: 900
      }],
      col: 12
    },
    fontSize: {
      caption: '\u5927\u5C0F',
      type: 'stepper',
      suffix: 'px',
      step: 1,
      min: 0,
      max: 1e3,
      col: 12
    },
    color: {
      caption: '\u989C\u8272',
      type: 'fill',
      col: 12
    }
  },
  line: {
    width: {
      caption: '\u7C97\u7EC6',
      type: 'stepper',
      suffix: 'px',
      step: 1,
      min: 0,
      col: 12
    },
    curve: {
      type: 'iconRadio',
      className: 'radio-custom',
      caption: '\u66F2\u7387',
      options: [{
        value: 'smooth',
        src: 'smooth-line',
        label: '\u5E73\u6ED1\u66F2\u7EBF'
      }, {
        value: 'polyline',
        src: 'poly-line',
        label: '\u6298\u7EBF'
      }],
      col: 12
    },
    style: {
      caption: '\u7EBF\u6761',
      type: 'select',
      options: [{
        label: '\u5B9E\u7EBF',
        value: 'solid'
      }, {
        label: '\u70B9\u7EBF',
        value: 'dotted'
      }, {
        label: '\u865A\u7EBF',
        value: 'dashed'
      }],
      col: 12
    },
    color: {
      caption: '\u989C\u8272',
      type: 'fill',
      col: 12
    }
  },
  margin: {
    top: {
      caption: '\u9876\u90E8',
      type: 'stepper',
      suffix: 'px',
      step: 1,
      min: 0,
      col: 12
    },
    bottom: {
      caption: '\u5E95\u90E8',
      type: 'stepper',
      suffix: 'px',
      step: 1,
      min: 0,
      col: 12
    },
    left: {
      caption: '\u5DE6\u4FA7',
      type: 'stepper',
      suffix: 'px',
      step: 1,
      min: 0,
      col: 12
    },
    right: {
      caption: '\u53F3\u4FA7',
      type: 'stepper',
      suffix: 'px',
      step: 1,
      min: 0,
      col: 12
    }
  }
}
const baseStyle = {
  font: {
    fontFamily: 'Microsoft Yahei',
    fontWeight: 'normal',
    color: '#fff',
    fontSize: 12
  },
  line: {
    width: 1,
    curve: 'polyline',
    style: 'solid',
    color: '#fff'
  },
  margin: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  }
}
suiteConfig.getSuites = function (config) {
  const { type } = config
  return {
    default: createObject({}, baseStyle[type]),
    children: this.SUITES_CHILDREN[type],
    ...config
  }
}

suiteConfig.initSuites = function (config) {
  const {
    top, bottom, left, right, fontFamily, fontSize, fontWeight, fontColor, width, style, color, curve, smooth, polyline
  } = config

  this.SUITES_CHILDREN.margin.top.caption = top
  this.SUITES_CHILDREN.margin.bottom.caption = bottom
  this.SUITES_CHILDREN.margin.right.caption = right
  this.SUITES_CHILDREN.margin.left.caption = left
  this.SUITES_CHILDREN.font.fontFamily.caption = fontFamily
  this.SUITES_CHILDREN.font.fontSize.caption = fontSize
  this.SUITES_CHILDREN.font.fontWeight.caption = fontWeight
  this.SUITES_CHILDREN.font.color.caption = fontColor
  this.SUITES_CHILDREN.line.width.caption = width
  this.SUITES_CHILDREN.line.style.caption = style
  this.SUITES_CHILDREN.line.color.caption = color
  this.SUITES_CHILDREN.line.curve.caption = curve
  this.SUITES_CHILDREN.line.curve.options[0].label = smooth
  this.SUITES_CHILDREN.line.curve.options[0].label = polyline
}

suiteConfig.COMPONENT_WIDTH = 200

export default suiteConfig
