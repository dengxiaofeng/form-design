let index = 0
function actionParams() {
  function Action() {
    const argument = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}

    this.uuid = argument.uuid || `${Date.now()}_${index}`
    this.isSystem = argument.isSystem
    this.actionName = argument.actionName
    this.actionType = argument.actionType
    this.eventType = argument.eventType
    this.params = argument.params || {}
    this.paramStr = '{}'
    this.func = argument.func
    index += 1
  }

  Action.prototype.toSchema = function () {
    return this.func ? {
      uuid: this.uuid,
      name: this.actionName,
      params: this.params,
      func: this.func
    } : this.isSystem ? {
      uuid: this.uuid,
      id: this.actionType,
      name: this.actionName,
      params: this.params
    } : {
      uuid: this.uuid,
      id: this.actionType,
      name: this.actionName,
      params: this.params,
      type: 'actionRef'
    }
  }
  return Action
}

export default actionParams
