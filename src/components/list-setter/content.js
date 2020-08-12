import EventEmitter from "bcore/event";

function Content(config) {
    this.config = config
    this.emitter = new EventEmitter()
    this.emitter.setMaxListeners(0)
    this.id = config.id
    config.init && config.init.call(this)
    this.hidden = !1
    this.content = this.initContent(config.content)
}

Content.prototype.isHidden = function name(params) {
    
}

Content.prototype.getProps = function name(params) {
    
}

Content.prototype.initContent = function name(params) {
    
}

Content.prototype.getId = function name(params) {
    
}

Content.prototype.getTitle = function name(params) {
    
}

Content.prototype.getTip = function name(params) {
    
}

Content.prototype.destroy = function name(params) {
    
}