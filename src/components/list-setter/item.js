import EventEmitter from "bcore/event";
import _ from "lodash";

import Param from "./param";

const cacheIds = {}
let bool = !1
function checkCacheId(id) {
    cacheIds.hasOwnProperty(id) || (cacheIds[id] = new Generate(id))
    return cacheIds[id]
}
function generId(value) {
    var id = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "id"
    var defaultValue = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "default";
  return checkCacheId(defaultValue).generate(value, id)
}
function genIdType() {
    return generId(null, "serial", "serial")
}

function Generate(namespace) {
    this.base = Date.now()
    this.guidStack = []
    this.namespace = namespace
    this.enableUniqueChecker = !0
}
Generate.prototype.enableChecker = function() {
    this.enableUniqueChecker = !0
}
Generate.prototype.disableChecker = function() {
    this.enableUniqueChecker = !1
}
Generate.prototype.generate = function(value, namspace) {
    return this.enableUniqueChecker && !bool || !value ? value && this.guidStack.indexOf(value) < 0 ? (this.guidStack.push(value),
    value) : this.generate(namspace + "_" + (this.base++).toString(36).toLowerCase(), namspace) : value
}

function addSid(config, value) {
    if(!config) {
        return config
    }
    value = value || (config && config.__sid__) || genIdType()
    try {
        config.__sid__ = value
        config.sid = getSid(config)
    } catch(e) {

    }
    return config
}
function getSid(config) {
    return config && config.__sid__
}

function Item(parent, config, fresh, emit) {
    debugger
    this.parent = parent
    const self = this
    this.content = {
        render(h) {
            return (
                <ListItem listItem={self}></ListItem>
            )
        }
    }
    this.maps = {}
    config = addSid(_.cloneDeep(config) || {})
    this.id = getSid(config)
    this.initParams(parent.getConfigure() || [], config)
    this.fresh = fresh
    this.emitter = new EventEmitter()
}

Item.prototype.initParams = function(configure, config) {
    this.params = configure.map(item => {
        const param = new Param(this, item, config[item.name])
        this.maps[param.getName()] = param
        return param
    })
    this.params.forEach(item => {
        return item.init()
    })
}

Item.prototype.isFresh = function() {
    return !!this.fresh && (this.fresh = !1, !0)
}

Item.prototype.getId = function() {
    return this.id
}

Item.prototype.getParent = function() {
    return this.parent
}

Item.prototype.getProp = function() {
    
}

Item.prototype.getProps = function() {

}

Item.prototype.getParams = function() {
    return this.params
}

Item.prototype.getDescription = function() {
    return this.parent.describeItem(this)
}

Item.prototype.getEditItem = function(h) {
    const parent = this.parent
    const params = this.getParams()
    return (
        <ul class="vs-list-title">
            {
                params.map(item => {
                    const editable = item.config.editable
                    if(editable) {
                        const config = item.config
                        const { name, setter } = config
                        const prop = {
                            key: name,
                            value: item.hotValue || item.value
                        }
                        return (
                            <li class="vs-text-control" style={{width: (100 / parent.editItemsNum) -2  + '%'}} key={item.id}>
                                {
                                    setter && setter.render(h, Object.assign({}, item, prop))
                                }
                            </li>
                        )
                    }
                })
            }
        </ul>
    )
}

Item.prototype.isEditable = function() {
    return this.parent.isEditable(this.data)
}

Item.prototype.isCheckable = function() {
    return this.parent.isCheckable()
}

Item.prototype.isAbleToDelete = function() {
    return this.parent.isAbleToDelete()
}

Item.prototype.isDraggable = function() {
    return this.parent.isDraggable(this.data)
}

Item.prototype.isMultiple = function() {
    return this.parent.isMultiple()
}

Item.prototype.isChecked = function() {
    return this.parent.isItemChecked(this)
}

Item.prototype.toggleCheck = function() {
    this.isChecked() ? this.parent.checkItem(this, !1): this.parent.checkItem(this, !0)
}

Item.prototype.getParam = function(key) {
    return this.maps[key]
}

Item.prototype.getParamValue = function(key) {
    const param = this.getParam(key)
    return param ? param.getValue(): null
}

Item.prototype.setParamValue = function(key, value) {

    const param = this.getParam(key)
    param && param.setValue(value)
}

Item.prototype.remove = function() {
    this.parent.removeItem(this)
}

Item.prototype.chainReach = function(chain) {
    return this.disableChain ? 0: this.setChain ? this.setChain.indexOf(chain) > -1 ? 0: (this.setChain.push(chain), 1): (this.setChain = [chain], -1)
}

Item.prototype.hasReach = function(chain) {
    return this.setChain.indexOf(chain) > -1
}

Item.prototype.endChain = function() {
    this.setChain = null
}

Item.prototype.syncPass = function(chain) {
    if(!this.disableChain) {
        const isSyncChain = !this.syncChain
        if(this.syncChain) {
            if (this.syncChain.indexOf(chain) > -1)
                return
        } else {
            this.syncChain = []
        }
        this.syncChain.push(chain)
        this.params.forEach(function(item) {
            return item !== chain && item.sync()
        })
        isSyncChain && (this.syncChain = null, this.parent.tryCheckFrom(chain), this.emitter.emit("change"),this.parent.sync())
    }
}

Item.prototype.toParams = function() {
    const ret = {}
    this.params.forEach(item => {
        ret[item.getName()] = item.toData()
    })
    addSid(ret, this.id)
    return ret
}

Item.prototype.toHotValue = function() {
    const ret = {}
    return this.params.forEach(item => {
        ret[item.getName()] = item.toData()
    })
    addSid(ret, this.id)
    return ret
}

Item.prototype.setParams = function(config) {
    config.__sid__ = this.id,
    this.initParams(this.parent.configure, config)
}

Item.prototype.receiveData = function() {

}

Item.prototype.onChange = function(callback) {
    this.emitter.on("change", callback)
    return () => {
        this.emitter.removeListener("change", callback)
    }
}

Item.prototype.onIsVariableChange = function() {
    return !0
}

Item.prototype.isReadOnly = function() {
    return !0
}

Item.prototype.syncMultiple = function() {
    this.emitter.emit("change")
}

export default Item