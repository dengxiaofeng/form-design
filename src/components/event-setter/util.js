import EventEmitter from "bcore/event";

const _actions_ = {}

const defaultGlobalConfig = {
  ONERROR: '{"compiled":"function main(){\\n \\"use strict\\";\\n\\nvar __compiledFunc__ = function onError(error, ctx) {\\n console.log(error);\\n // 可以在这里做弹框提示等操作 \\n};\\n return __compiledFunc__.apply(this, arguments);\\n }","gmtModified":1594089440000,"source":"function onError(error, ctx){\\n console.log(error);\\n // 可以在这里做弹框提示等操作 \\n}","type":"js","error":{}}',
  GLOBALFUNCTION: "{\"gmtModified\":1594795270000,\"module\":{\"compiled\":\"'use strict';\\n\\nexports.__esModule = true;\\nexports.hellGlobal = hellGlobal;\\nexports.willMount = willMount;\\nexports.willUnmount = willUnmount;\\n/**\\n* 全局函数\\n*/\\nfunction hellGlobal() {\\n console.log('hello, global');\\n}\\n\\n// 页面节点即将开始渲染 \\n\\n// 页面节点即将开始渲染 \\nfunction willMount(ctx) {}\\n// 页面节点即将从页面移除 \\nfunction willUnmount(ctx) {}\",\"source\":\"/**\\n* 全局函数\\n*/\\nexport function hellGlobal() {\\n console.log('hello, global');\\n}\\n \\n // 页面节点即将开始渲染 \\n\\n// 页面节点即将开始渲染 \\nexport function willMount(ctx) {\\n \\n} \\n // 页面节点即将从页面移除 \\nexport function willUnmount(ctx) {\\n \\n}\"},\"type\":\"FUNCTION\",\"list\":[{\"id\":\"hellGlobal\",\"title\":\"hellGlobal\"},{\"id\":\"willMount\",\"title\":\"willMount\"},{\"id\":\"willUnmount\",\"title\":\"willUnmount\"}]}",
  GLOBALFIT: "{\"compiled\":\"function main(){\\n 'use strict';\\n\\nvar __compiledFunc__ = function fit(response) {\\n var content = response.content !== undefined ? response.content : response;\\n var error = {\\n message: response.errorMsg || response.errors && response.errors[0] && response.errors[0].msg || response.content || '远程数据源请求出错，success is false'\\n };\\n var success = true;\\n if (response.success !== undefined) {\\n success = response.success;\\n } else if (response.hasError !== undefined) {\\n success = !response.hasError;\\n }\\n return {\\n content: content,\\n success: success,\\n error: error\\n };\\n};\\n return __compiledFunc__.apply(this, arguments);\\n }\",\"gmtModified\":1594089440000,\"source\":\"function fit(response) {\\n const content = (response.content !== undefined) ? response.content : response;\\n const error = {\\n message: response.errorMsg ||\\n (response.errors && response.errors[0] && response.errors[0].msg) ||\\n response.content || '远程数据源请求出错，success is false',\\n };\\n let success = true;\\n if (response.success !== undefined) {\\n success = response.success;\\n } else if (response.hasError !== undefined) {\\n success = !response.hasError;\\n }\\n return {\\n content,\\n success,\\n error,\\n };\\n}\",\"type\":\"js\",\"error\":{}}",
  GLOBALWILLFETCH: '{"compiled":"function main(){\\n \\"use strict\\";\\n\\nvar __compiledFunc__ = function willFetch(vars, config) {\\n // 通过 vars.data 可以更改查询参数\\n // 通过 config.header 可以更改 header\\n // 通过 config.url 可以更改 url\\n console.log(vars, config); // 可以查看还有哪些参数可以修改。\\n};\\n return __compiledFunc__.apply(this, arguments);\\n }","gmtModified":1594089440000,"source":"function willFetch(vars, config) {\\n // 通过 vars.data 可以更改查询参数\\n // 通过 config.header 可以更改 header\\n // 通过 config.url 可以更改 url\\n console.log(vars, config); // 可以查看还有哪些参数可以修改。\\n}","type":"js","error":{}}'
}
function GlobalConfig() {
  this.configs = {}
}

GlobalConfig.prototype.getConfig = function () {
  const type = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ''
  return this.configs[type]
}

GlobalConfig.prototype.setConfig = function (key, value) {
  this.configs[key] = value
  return this
}

GlobalConfig.prototype.getConfigFromRemote = function () {
  return this.configs = Object.assign(this.configs, {
    function: JSON.parse(defaultGlobalConfig.GLOBALFUNCTION || '{}'),
    fit: {
      module: JSON.parse(defaultGlobalConfig.GLOBALFIT || '{}')
    },
    willFetch: {
      module: JSON.parse(defaultGlobalConfig.GLOBALWILLFETCH || '{}')
    }
  })
}

function Actions() {
  this.actions = {
    page: {},
    global: {},
    fitGlobal: {}
  }

  this.templateString = {
    page: '',
    global: '',
    fitGlobal: ''
  }

  this.emitter = EventEmitter
  this.schemaTraverser = null
  this.compiledStatus = {}
  this.enabledLock = !0
  this.globalJSModified = !1
  this.currentEditorState = null

  this.api = {
    lock: null,
    unlock: null,
    query: null
  }
  this.__loopGlobalQuery = null
  this.__loopGlobalIntervalTimer = null
}

Actions.prototype.getActions = function () {
  const key = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'page'
  this.actions[key].list = this.getActionsList(key)
  return this.actions[key]
}

Actions.prototype.getActionsList = function (actionType) {
  let ret = []
  if (actionType) {
    this.actions[actionType] && (ret = this.actions[actionType].list)
  } else {
    const actions = Object.keys(this.actions)
    ret = actions.reduce((data, key) => (this.actions[key].list ? data.concat(this.actions[key].list) : data), [])
  }
  return _actions_ && Array.isArray(ret) && ret.length > 0 && ret.forEach(item => {
    if (item) {
      const currentItem = _actions_[item.id]
      item.refCount = currentItem ? currentItem.refCount : 0
      item.location = currentItem ? currentItem.location : []
    }
  }), ret
}

Actions.prototype.getAction = function () {

}

Actions.prototype.getSourceCode = function () {
  const key = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'page'
  return this.actions && this.actions[key] && this.actions[key].module && this.actions[key].module.source ? this.actions[key].module.source : ''
}

Actions.prototype.getInlineSourceCode = function () {

}

Actions.prototype.setSchemaTraverser = function () {

}

Actions.prototype.setLockAPILauncher = function () {

}

Actions.prototype.setFunctionTemplate = function () {

}

Actions.prototype.setActions = function (config) {
  const type = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'page'
  this.actions[type] = { ...config }
  this.actions[type].module || (
    this.actions[type] = 'FUNCTION',
    this.actions[type].module = {
      source: this.templateString[type],
      compiled: !0
    }
  )
}

Actions.prototype.setSourceCode = function () {

}

Actions.prototype.addActionItem = function () {
  const eventType = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'page'
  const defaultName = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'defaultAction'
  const defaultCode = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'function defaultAction () {\n}'
  const needExport = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
    needExport: !0
  }
  let _export_ = needExport.needExport ? 'export' : ''
  let str = ''
  if (defaultCode && typeof defaultCode === 'string') {
    str = defaultCode
    const reg = /([\s\S]*)function\s*([$a-zA-Z_][0-9A-Z_a-z$]*)\s*/.exec(str)
    reg[2] = reg[2] !== defaultName && (str = str.replace(/(function\s*)([$a-zA-Z_][0-9A-Z_a-z$]*)\s*/, `$1${defaultName}`))
    reg[1] && (_export_ = `${reg[1]}${_export_}`, str = str.replace(/([\s\S]*)function\s*([$a-zA-Z_][0-9A-Z_a-z$]*)\s*/, 'function $2'))
  } else {
    str = `function ${defaultName} {\n\n}`
  }
}

Actions.prototype.locate = function () {

}

Actions.prototype.calculateRefs = function () {

}

Actions.prototype.switchEditorState = function () {

}

Actions.prototype.ableToSaveGlobalJS = function () {

}

Actions.prototype.disableLock = function () {

}

Actions.prototype.enableLock = function () {

}

Actions.prototype.toData = function () {

}

Actions.prototype.onAddAction = function () {

}

Actions.prototype.onActionChange = function () {

}

Actions.prototype.onLocateFunction = function () {

}

Actions.prototype.destroy = function () {

}

window.action_util = new Actions()
const globalConfig = new GlobalConfig()
export { globalConfig };
