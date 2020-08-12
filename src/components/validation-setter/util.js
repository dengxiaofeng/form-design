import EventEmitter from "bcore/event";

export const defaultRules = {
    customValidate: "自定义函数",
    date: "日期",
    email: "邮箱",
    ip: "IP 地址",
    mac: "MAC 地址",
    maxLength: "最大长度",
    maxValue: "最大值",
    minLength: "最小长度",
    minValue: "最小值",
    mobile: "手机",
    money: "金额",
    number: "数字",
    phone: "电话",
    required: "必填",
    url: "网址",
    zipcode: "邮政编码"
}

const ruleType = (type, rule, h) => {
    switch(type) {
        case "required":
        case "number":
        case "email":
        case "mobile":
        case "url":
        case "date":
        case "money":
        case "zipcode":
        case "phone":
        case "mac":
            return <BaseValidate rule={rule}></BaseValidate>;
        case "ip":
            return <EditValidateIP rule={rule}></EditValidateIP>;
        case "maxLength":
        case "minLength":
        case "maxValue":
        case "minValue":
            return <EditValidate rule={rule}></EditValidate>
        case "customValidate":
        default:
            return <CustomValidate rule={rule}></CustomValidate>
    }
}

function peek(target, privateKeys) {
    const ret = {}
    for(let key in target) {
        privateKeys.indexOf(key) >= 0 || Object.prototype.hasOwnProperty.call(target, key) && (ret[key] = target[key])
    }
    return ret
}
function transformTitle(type) {
    return type ? defaultRules[type] || type.toUpperCase(): "UNKNOW"
}
function Validator(config, helpLink, prop) {
    this.emitter = new EventEmitter()
    this.prop = prop
    this.helpLink = helpLink
    this.receiveConfig(config)
}

Validator.prototype.receiveConfig = function(config = {}) {
    const prop = peek(config, ["title", "type", "checked"])
    this.type = config.type
    this.title = config.title || transformTitle(config.type)
    this.checked = config.checked
    this.params = prop || {}
}

Validator.prototype.getType = function() {
    return this.type
}

Validator.prototype.getDescription = function() {
    return this.title
}

Validator.prototype.toConfig = function() {
    return Object.assign({
        type: this.getType(),
        checked: this.isChecked()
    }, this.params)
}

Validator.prototype.setParam = function(key, value) {
    debugger
    this.getParam(key) !== value && (
        this.params[key]= value,
        this.emitter.emit("change", this.toConfig())
    )
}

Validator.prototype.getParam = function(key) {
    return this.params[key]
}

Validator.prototype.popedit = function(h, target) {
    return ruleType(this.type, this, h)
}
    

Validator.prototype.setCheck = function(checked) {
    this.checked && !checked ? (
        this.checked = !1,
        this.emitter.emit("change", this.toConfig())
    ) : !this.checked && checked && (
        this.checked = !0,
        this.emitter.emit("change", this.toConfig())
    )
}

Validator.prototype.toggleCheck = function() {
    this.setCheck(!this.checked)
}

Validator.prototype.isChecked = function() {
    return this.checked
}

Validator.prototype.onChange = function(params) {
    return this.emitter.on("change", params),
        () => {
            this.emitter.removeListener("change", params)
        }
}

export default Validator