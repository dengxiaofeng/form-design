import _ from "lodash";

import Item from "./item";

function getSid(config) {
    return config && config.__sid__
}

function ListUtil(config, props, callback) {
    this.prop = config
    this.descriptor =  ""
    this.setOnSync(callback)
    this.configure = props.configure || []
    this.display = props.display
    this.onEdit = props.onEdit
    this.deletable = props.deletable
    this.draggable = props.draggable
    this.editable = props.editable
    this.maxLength = props.maxLength
    this.minLength = props.minLength
    this.items = []
    this.setCheckField(props.checkField)
    this.syncLock = 0
    this.updateItems(config)
    this.checkTheChecked()
    this.editItemsNum = this.configure.filter(item => {
        return !!item.editable
    }).length

    this.descriptor = function(config) {
        const param = config.getParamValue(props.descriptor)
        return param
    }
    const self = this
    config && config.onValueChange && (this.offSync = config.onValueChange(function() {
        var argu = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        "SUB_VALUE_CHANGE" !== argu.type && (self.updateItems(config),
        self.onSync && self.onSync())
    }))
    // "string" === descr ? this.descriptor = function(config) {
    //     debugger
    //     const param = config.getParamValue(config.descriptor)
    //     return param
    // }: "function" === descr ? this.descriptor = config.descriptor: this.descriptor = function name(config) {
    //     debugger
    //     console.log("descript", config)
    //     return config.getId()
    // }

   

}

ListUtil.prototype.setCheckField = function(item) {
    const multipe = this.multiple
    item && ("*" === item[0] ? (this.multiple = !0, this.checkField = item.substr(1)): (this.multiple = !1, this.checkField = item))
    multipe !== this.multiple && (this.items || []).forEach(item => {
        return item.syncMultiple()
    })
}

ListUtil.prototype.updateItems = function(config) {
    this.items = config.hotValue && config.hotValue.map((item, index) => {
        return new Item(this, item, !1, this.items && this.items[index])
    }) || []
    console.log("updateItems", this.items)

}

ListUtil.prototype.getProp = function() {
    return this.prop
}

ListUtil.prototype.getProps = function() {
    return this.prop.getProps()
}

ListUtil.prototype.setOnSync = function(callback) {
    this.onSync = callback
}

ListUtil.prototype.detach = function() {
    this.onSync = null
    this.offSync && this.offSync()
    this.offSync = null
}

ListUtil.prototype.getConfigure = function() {
    return this.configure
}

ListUtil.prototype.getDisplay = function() {
    return this.display
}

ListUtil.prototype.getOnEdit = function() {
    return this.onEdit
}

ListUtil.prototype.isCheckable = function() {
    return null != this.checkField
}

ListUtil.prototype.isAbleToDelete = function() {
    return !!this.deletable
}

ListUtil.prototype.isEditable = function(status) {
    return "function" == typeof this.editable ? !!this.editable(status): !!this.editable
}

ListUtil.prototype.isDraggable = function(status) {
    return "function" == typeof this.draggable ? !!this.draggable(status): !!this.draggable
}

ListUtil.prototype.isMultiple = function() {
    return this.multiple
}

ListUtil.prototype.isItemChecked = function(item) {
   const value = item.getParamValue(this.checkField)
   return value && "object" === ("undefined" == typeof value ? "undefined": _.isSymbol(value)) ? "variable" !== value.type && value: value
}

ListUtil.prototype.getChecked = function() {
    return this.items.filter(item => {
        return !!item.getParamValue(this.checkField)
    })
}

ListUtil.prototype.tryCheckFrom = function(item) {
    if(item.getName() === this.checkField && item.getValue() && !this.multiple) {
        const parent = item.getParent()
        this.syncLock += 1
        this.getChecked().forEach(item => {
            return item !== parent && item.setParamValue(this.checkField, !1)
        })
        this.syncLock > 0 && (this.syncLock -=1)
    }
}

ListUtil.prototype.checkItem = function(item, callback) {
    item.setParamValue(this.checkField, callback)
}

ListUtil.prototype.describeItem = function(item) {
    debugger
    const index = this.items.indexOf(item)
    console.log("describeItem index", index)
    return this.descriptor.call(item, item, index) || {
        text: "项目-{index}",
        index: index
    }
}

ListUtil.prototype.receiveItems = function(param) {
    Array.isArray(param) || (param = [])
    const ret = {};
    this.items.forEach(item => {
        ret[item.getId()] = item
    })
    this.items = param.map(item => {
        const id = getSid(item)
        let currentItem = void 0
        id && ret.hasOwnProperty(id) ? (currentItem = ret[id]):""
    })
}

ListUtil.prototype.checkTheChecked = function() {
    if(this.isCheckable() && this.isMultiple()) {
        this.syncLock += 1
        const checks = this.getChecked()
        checks.length > 0 && this.checkItem(checks[checks.length - 1], !0)
        this.syncLock > 0 && (this.syncLock -= 1)
    }
}

ListUtil.prototype.getItems = function() {
    return this.items
}

ListUtil.prototype.sortItems = function(items) {
    this.items = items
    this.sync()
}

ListUtil.prototype.removeItem = function(item) {
    if(!(this.minLength >= this.items.length)) {
        const index = this.items.indexOf(item)
        index < 0 || (this.items.splice(index, 1), this.sync())
    }
}

ListUtil.prototype.toSetHotValue = function() {
    this.sync()
}

ListUtil.prototype.addItem = function(item) {
    this.maxLength && this.maxLength <= this.items.length || (this.items.push(new Item(this, item || null, !0)), this.checkTheChecked(), this.sync())
}

ListUtil.prototype.sync = function(callback) {
    let ret = {}
    this.syncLock > 0 || (callback || (this.prop.setHotValue(this.items.map(function(item) {
        return item.toParams()
    }))))
    this.onSync && this.onSync() 
}

export default ListUtil