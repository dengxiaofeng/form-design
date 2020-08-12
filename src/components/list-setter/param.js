import EventEmitter from "bcore/event";
import _ from "lodash";

function Param(parent, param, value) {
    debugger
    this.emitter = new EventEmitter()
    this.parent = parent
    this.config = param || {};
    this.id = _.uniqueId(null, "param", "param")
    this.value = value
    let defaultValue = null;
    void 0 !== this.config.defaultValue ? defaultValue = this.config.defaultValue: "function" != typeof this.config.initialValue && (defaultValue = this.config.initialValue)
    this.defaultValue = defaultValue
    console.log('Param config', this.config)
    // this.initial = combineInitial(this, this.config)
}
Param.prototype.init = function() {
    debugger
    if(!this.inited) {
        console.log('init config', this.config)
        this.inited = !0
        this.value = this.config && this.config.initial ? this.config.initial(this.value || this.defaultValue): this.value || this.defaultValue  
        const value = this.getValue()
        this.hotValue = value
        this.hotData = JSON.stringify({value: value, hotValue: this.hotValue})
        this.resolveValue()
    }
}

Param.prototype.resolveValue = function() {
    if(this.value && "variable" === this.value.type) {
        const valueObj = this.value
        this.value = valueObj.value
        this.variableValue = valueObj.variable
        this.useVariable = this.isSupportVariable()
    } else {
        this.useVariable = !1
    }
}

Param.prototype.isInited = function(params) {
    
}

Param.prototype.getParent = function() {

}

Param.prototype.getProp = function() {

}

Param.prototype.getProps = function name(params) {
    
}

Param.prototype.getId= function() {
    return this.id
}

Param.prototype.getName = function() {
    return this.config.name
}

Param.prototype.getTitle = function() {
    return this.config.title || this.getName()
}

Param.prototype.getTip = function name(params) {
    
}

Param.prototype.isEditable = function name(params) {
    
}

Param.prototype.getValue = function(params) {
    const accessor = this.config && this.config.accessor
    accessor && (this.value = accessor.call(this, this.value))
    return this.value
}

Param.prototype.getParamList = function() {
    return this.parent
}

Param.prototype.getMixValue = function(value) {
    value || (value = this.getValue())
    value && "object" === ("undefined" == typeof value ? "undefined": _.isSymbol(value)) && (value.__sid__ = this.id)
    return this.isUseVariable() ? {
        type: "variable",
        variable: this.getVariableValue(),
        value: this.getVariableValue(),
        __sid__: this.id
    }: value
}

Param.prototype.toData = function() {
    return _.cloneDeep(this.getMixValue())
}

Param.prototype.getDefaultValue = function(params) {
    return this.defaultValue
}

Param.prototype.getHotValue = function(params) {
    return this.hotValue
}

Param.prototype.setHotValue = function(params) {
    this.setValue(params)
}

Param.prototype.setValue = function(value, t, n) {
    console.log("update value")
    const hasChain = this.parent.chainReach(this)
    if(hasChain !== 0) {
       const mutator = this.config.mutator
       this.value= value
       this.hotValue = value
       mutator && mutator.call(this, this.value, this.hotValue)
       this.modify(n) && (this.valueChange(), this.parent.syncPass(this))
       hasChain === -1 && this.parent.endChain()
    }
}

Param.prototype.receiveValue = function name(params) {
    
}

Param.prototype.modify = function(hotValue) {
    const param = JSON.stringify({
        value: this.getValue(),
        hotValue: this.getHotValue()
    })
    return !(!hotValue && param === this.hotData) && (this.hotData = param, !0)
}

Param.prototype.valueChange = function name(params) {
    this.emitter.emit("valuechange")
}

Param.prototype.sync = function() {
    if(this.parent.hasReach()) {
        const sync = this.config.sync
        if(sync) {
            const value = sync.call(this, this.getValue(), this.hotValue)
            void 0 !== value && (this.setValue(value))
        } else {
            this.setValue(this.getValue())
        }
    }
}

Param.prototype.getDisplay = function name(params) {
    return this.config.display || "block"
}

Param.prototype.isHidden = function name(params) {
    
}

Param.prototype.isUseVariable = function name(params) {
    
}

Param.prototype.isSupportVariable = function name(params) {
    
}

Param.prototype.isDisabled = function name(params) {
    
}

Param.prototype.isIgnore = function name(params) {
    
}

Param.prototype.isGroup = function name(params) {
    
}

Param.prototype.isExpand = function name(params) {
    
}

Param.prototype.onExpandChange = function name(params) {
    
}

Param.prototype.getVariableValue = function() {
    return this.variableValue
}

Param.prototype.getSetter = function() {
    return this.config.setter
}

Param.prototype.setUseVariable = function name(params) {
    
}

Param.prototype.toggleExpand = function name(params) {
    
}

Param.prototype.onValueChange = function name(params) {
    
}

export default Param