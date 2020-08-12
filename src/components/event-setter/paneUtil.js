import EventEmitter from 'bcore/event'
import Bus from './bus'

function Pane() {
  this.stashedDock = null
  this.emitter = new EventEmitter()
  this.docks = []
  this.miniMode = !1
  this.bus = new Bus()
}

Pane.prototype.activeDock = function () {

}

Pane.prototype.addDock = function () {

}

Pane.prototype.addDockContent = function (action, children) {
  const dock = this.docks.find(item => item.getName() === action)
  dock && dock.addContent(children)
}

Pane.prototype.removeDock = function (action) {
  typeof action === 'string' && (action = this.docks.find(item => item.getName() === action))

  const currentDock = this.docks.indexOf(action)
  currentDock > -1 && (
    this.docks.splice(currentDock, 1),
    action.destroy(),
    this.activeDock() === action && this.activeDock(this.docks[0]),
    this.emitter.emit('dockschange', this.docks)
  )
}

Pane.prototype.getDocks = function () {
  return this.docks
}

Pane.prototype.onDocksChange = function (event) {
  const self = this
  return this.emitter.on('dockschange', event),
  function () {
    self.emitter.removeListener('dockschange', event)
  }
}
Pane.prototype.onDockShow = function () {
  const self = this
  this.emitter.on('ve.dockPane.showDock', event)
  return function () {
    self.emitter.removeListener('ve.dockPane.showDock', event)
  }
}

Pane.prototype.onDockHide = function (event) {
  const self = this
  this.emitter.on('ve.dockPane.hideDock', event)
  return function () {
    self.emitter.removeListener('ve.dockPane.hideDock', event)
  }
}
